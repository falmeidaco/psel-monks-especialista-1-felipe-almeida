<?php

function monks_setup_theme()
{
  // Habilita suporte para thumbnails
  add_theme_support('post-thumbnails');

  // Registra os menus
  register_nav_menus(array(
    'primary' => 'Primary Navigation',
    'secondary' => 'Secondary Navigation',
    'social' => 'Social Links'
  ));
}

add_action('after_setup_theme', 'monks_setup_theme');

function monks_setup_cp_formsubmissions()
{
  $labels = array(
    'name'               => 'Submissões de Formulário',
    'singular_name'      => 'Submissão',
    'menu_name'          => 'Formulários',
    'name_admin_bar'     => 'Submissão',
    'add_new'            => 'Adicionar Nova',
    'add_new_item'       => 'Adicionar Nova Submissão',
    'new_item'           => 'Nova Submissão',
    'edit_item'          => 'Editar Submissão',
    'view_item'          => 'Ver Submissão',
    'all_items'          => 'Todas as Submissões',
    'search_items'       => 'Buscar Submissões',
    'not_found'          => 'Nenhuma Submissão encontrada',
    'not_found_in_trash' => 'Nenhuma Submissão encontrada na lixeira'
  );

  $args = array(
    'labels'             => $labels,
    'public'             => false,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => false,
    'capability_type'    => 'post',
    'has_archive'        => false,
    'hierarchical'       => false,
    'menu_position'      => 20,
    'menu_icon'          => 'dashicons-email',
    'supports'           => array('title', 'editor'),
  );

  register_post_type('formsubmission', $args);
}

add_action('init', 'monks_setup_cp_formsubmissions');

// Remove o botão "Adicionar Novo" no menu e na barra superior
function monks_remove_add_new_formsubmission()
{
  global $submenu;
  // Remove do menu lateral
  unset($submenu['edit.php?post_type=formsubmission'][10]); 
}
add_action('admin_menu', 'monks_remove_add_new_formsubmission');

function monks_disable_new_formsubmission_button()
{
  if (get_current_screen()->post_type === 'formsubmission') {
    echo '<style>.page-title-action { display: none !important; }</style>';
  }
}
add_action('admin_head', 'monks_disable_new_formsubmission_button');

function monks_disable_formsubmission_editor()
{
  global $pagenow, $post;

  if ($pagenow === 'post.php' && isset($post) && $post->post_type === 'formsubmission') {
    // Remove o editor padrão
    remove_post_type_support('formsubmission', 'editor');
  }
}

add_action('admin_init', 'monks_disable_formsubmission_editor');

/* API para retornar as tags usadas nos posts com uma categoria específica */
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

/* API para retornar os posts apenas com os dados usados no frontend */
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

function monks_handle_formsubmission_register(WP_REST_Request $request)
{
  // Verifica o cabeçalho X-Form-Token
  $token = $request->get_header('X-Form-Token');
  if ($token !== 'monks2025') {
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

// Registra o endpoint na API REST do WordPress
function monks_register_api_routes()
{
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


/* Campo customizado para categoria de Post */

// Adiciona o campo "Título" na tela de adição de categoria
function monks_add_custom_category_field()
{
?>
  <div class="form-field">
    <label for="category_title">Título</label>
    <input type="text" name="category_title" id="category_title">
    <p class="description">Defina um título personalizado para esta categoria.</p>
  </div>
<?php
}
add_action('category_add_form_fields', 'monks_add_custom_category_field');

// Adiciona o campo "Título" na tela de edição da categoria
function monks_edit_custom_category_field($term)
{
  $title = get_term_meta($term->term_id, 'category_title', true);
?>
  <tr class="form-field">
    <th scope="row"><label for="category_title">Título</label></th>
    <td>
      <input type="text" name="category_title" id="category_title" value="<?php echo esc_attr($title); ?>">
      <p class="description">Defina um título personalizado para esta categoria.</p>
    </td>
  </tr>
<?php
}
add_action('category_edit_form_fields', 'monks_edit_custom_category_field');

// Salva o campo "Título" ao criar ou editar a categoria
function monks_save_custom_category_field($term_id)
{
  if (isset($_POST['category_title'])) {
    update_term_meta($term_id, 'category_title', sanitize_text_field($_POST['category_title']));
  }
}
add_action('created_category', 'monks_save_custom_category_field');
add_action('edited_category', 'monks_save_custom_category_field');

// Exibe o campo na lista de categorias no painel do WordPress
function monks_add_custom_category_column($columns)
{
  $columns['category_title'] = 'Título';
  return $columns;
}
add_filter('manage_edit-category_columns', 'monks_add_custom_category_column');

function monks_custom_category_column_content($content, $column_name, $term_id)
{
  if ($column_name === 'category_title') {
    $content = get_term_meta($term_id, 'category_title', true);
  }
  return $content;
}
add_filter('manage_category_custom_column', 'monks_custom_category_column_content', 10, 3);


/* *
 * Adiciona suporte para CORS 
 */
function monks_rest_cors_headers($headers)
{
  // Permite qualquer origem (modifique se necessário)
  $headers['Access-Control-Allow-Origin'] = '*';
  // Permite métodos GET, POST e OPTIONS
  $headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
  // Permite cabeçalhos específicos
  $headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type, Authorization, X-Form-Token';
  return $headers;
}

add_filter('rest_post_dispatch', function ($result) {
  if (is_wp_error($result)) return $result;

  $headers = monks_rest_cors_headers([]);
  foreach ($headers as $key => $value) {
    header("$key: $value");
  }

  return $result;
}, 15);

/**
 * Adiciona suporte para requisições OPTIONS (necessário para CORS)
 */
function monks_handle_preflight()
{
  if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
    $headers = monks_rest_cors_headers([]);
    foreach ($headers as $key => $value) {
      header("$key: $value");
    }
    status_header(200);
    exit;
  }
}

add_action('init', 'monks_handle_preflight');
