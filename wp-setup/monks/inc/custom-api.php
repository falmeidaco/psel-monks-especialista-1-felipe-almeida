<?php

/**
 * Registrar as rotas personalizadas da API
 *
 * Expondo apenas os dados consumidos pela aplicação front-end
 */
function monks_register_api_routes()
{
  // Retornar posts por categoria incluindo informações da categoria retornada
  register_rest_route('custom/v1', '/posts-by-term', array(
    'methods'  => 'GET',
    'callback' => 'monks_api_get_posts_by_term',
    'args'     => [
      'term' => [
        'required' => true,
        'validate_callback' => function ($param) {
          return !empty($param) && is_string($param);
        }
      ]
    ],
    'permission_callback' => '__return_true',
  ));

  // Retornar tags por categoria de postagens publicadas
  register_rest_route('custom/v1', '/tags-by-term', array(
    'methods'  => 'GET',
    'callback' => 'monks_api_get_tags_by_term',
    'args'     => [
      'term' => [
        'required' => true,
        'validate_callback' => function ($param) {
          return !empty($param) && is_string($param);
        }
      ]
    ],
    'permission_callback' => '__return_true',
  ));

  // Retorna itens do menu pelo id/nome
  register_rest_route('custom/v1', '/menu', array(
    'methods'  => 'GET',
    'callback' => 'monks_get_menu_items',
    'args'     => [
      'menu' => [
        'required' => true,
        'validate_callback' => function ($param) {
          return !empty($param) && is_string($param);
        }
      ]
    ],
    'permission_callback' => '__return_true',
  ));

  // Recebe dados via post para cadastro na base do Wordpress
  register_rest_route('custom/v1', '/new-formsubmission', array(
    'methods'             => 'POST',
    'callback'            => 'monks_handle_formsubmission_register',
    'permission_callback' => '__return_true',
    'args'                => [
      'name' => ['required' => true],
      'phone' => ['required' => false],
      'email' => ['required' => true],
      'message' => ['required' => true],
    ],
  ));
}
add_action('rest_api_init', 'monks_register_api_routes');


/* Callback para retorno dos posts por termo */
function monks_api_get_posts_by_term($request)
{

  $term_slug = $request->get_param('term');
  // Obtém a categoria pelo slug
  $term = get_term_by('slug', $term_slug, 'category');

  if (!$term) {
    return new WP_Error('categoria_nao_encontrada', 'Categoria não encontrada', ['status' => 404]);
  }

  $args = array(
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 10,
    'tax_query'      => array(
      array(
        'taxonomy' => 'category',
        'field'    => 'slug',
        'terms'    => $term_slug,
      ),
    ),
  );

  $query = new WP_Query($args);
  $posts = [];

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();

      // Obtém a imagem de destaque (thumbnail)
      $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'full');

      $posts[] = [
        'id'            => get_the_ID(),
        'title'         => get_the_title(),
        'content'       => apply_filters('the_content', get_the_content()),
        'excerpt'       => get_the_excerpt(),
        'thumbnail_url' => $thumbnail_url ?: '', // Retorna string vazia se não houver imagem
        'permalink'     => get_permalink(),
      ];
    }
    wp_reset_postdata();
  }

  $response = [
    'term'        => $term->name,
    'name'        => get_term_meta($term->term_id, 'category_title', true) ?: $term->name,
    'description' => $term->description,
    'posts'       => $posts,
  ];

  return rest_ensure_response($response);
}

/* Callback para retorno das tags por termo */
function monks_api_get_tags_by_term($request)
{
  global $wpdb;
  $term_slug = $request->get_param('term');

  // Obtém o ID da categoria pelo slug
  $term = get_term_by('slug', $term_slug, 'category');

  if (!$term) {
    return new WP_Error('categoria_nao_encontrada', 'Categoria não encontrada', ['status' => 404]);
  }

  $category_id = $term->term_id;

  // Consulta SQL para obter as tags usadas nos posts da categoria
  $query = $wpdb->prepare("
      SELECT DISTINCT t.term_id, t.name, t.slug, tt.count 
        FROM {$wpdb->terms} t
        INNER JOIN {$wpdb->term_taxonomy} tt ON t.term_id = tt.term_id
        INNER JOIN {$wpdb->term_relationships} tr_tag ON tt.term_taxonomy_id = tr_tag.term_taxonomy_id
        INNER JOIN {$wpdb->posts} p ON tr_tag.object_id = p.ID
        INNER JOIN {$wpdb->term_relationships} tr_cat ON p.ID = tr_cat.object_id
        INNER JOIN {$wpdb->term_taxonomy} tt_cat ON tr_cat.term_taxonomy_id = tt_cat.term_taxonomy_id
        WHERE tt_cat.taxonomy = 'category' AND tt_cat.term_id = %d
        AND tt.taxonomy = 'post_tag'
        AND p.post_status = 'publish'
  ", $category_id);

  $tags = $wpdb->get_results($query);

  // Formata a resposta
  $tag_list = array_map(function ($tag) {
    return [
      'id'    => intval($tag->term_id),
      'name'  => $tag->name,
      'slug'  => $tag->slug,
      'count' => intval($tag->count),
    ];
  }, $tags);

  return rest_ensure_response(['tags' => $tag_list]);
}


/* Callback para dos itens do menu por ID/nome */
function monks_get_menu_items($request)
{
  $menu_slug = $request->get_param('menu');

  $menu = wp_get_nav_menu_object($menu_slug);

  if (!$menu) {
    return new WP_Error('menu_nao_encontrado', 'Menu não encontrado', ['status' => 404]);
  }

  $menu_items = wp_get_nav_menu_items($menu->term_id);

  $formatted_menu = [];

  foreach ($menu_items as $item) {
    $formatted_menu[] = [
      'id'    => $item->ID,
      'title' => $item->title,
      'url'   => $item->url,
      'parent' => $item->menu_item_parent,
      'order'  => $item->menu_order,
      'type'   => $item->type,
      'classes' => implode(' ', $item->classes),
      'target'  => $item->target ?: '_self',
    ];
  }

  return rest_ensure_response(['menu' => $formatted_menu]);
}

/* Callback para guardar os dados do formulário no front-end */
function monks_handle_formsubmission_register(WP_REST_Request $request)
{
  // Resgata o valor do token para requisição post (ajustável nas configurações do site no admin)
  $form_token = get_option('form_token', '');
  // Verifica o cabeçalho X-Form-Token 
  $token = $request->get_header('X-Form-Token');
  if ($token !== $form_token) {
    return new WP_Error('token_invalido', 'Acesso negado. Token inválido.', ['status' => 403]);
  }

  // Obtém os dados enviados no formulário
  $name    = sanitize_text_field($request->get_param('name'));
  $phone   = sanitize_text_field($request->get_param('phone'));
  $email   = sanitize_email($request->get_param('email'));
  $message = sanitize_textarea_field($request->get_param('message'));

  // Verifica se os campos obrigatórios estão preenchidos
  if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    return new WP_Error('campos_faltando', 'Nome, Telefone, E-mail e Mensagem são obrigatórios.', ['status' => 400]);
  }

  // Monta o conteúdo do post com os dados do formulário
  $post_content = "<p><strong>Nome:</strong> $name</p>";
  $post_content .= "<p><strong>Telefone:</strong> $phone</p>";
  $post_content .= "<p><strong>E-mail:</strong> $email</p>";
  $post_content .= "<p><strong>Mensagem:</strong><br>$message</p>";

  // Cria um novo post do tipo formsubmission
  $post_id = wp_insert_post([
    'post_type'    => 'formsubmission',
    'post_title'   => $name, // O título será o nome do usuário
    'post_content' => $post_content,
    'post_status'  => 'publish', // Define como publicado para aparecer no admin
  ]);

  // Verifica se o post foi criado com sucesso
  if (is_wp_error($post_id)) {
    return new WP_Error('erro_criacao', 'Erro ao salvar a submissão.', ['status' => 500]);
  }

  return rest_ensure_response([
    'message' => 'Submissão recebida com sucesso!',
    'id'      => $post_id,
  ]);
}