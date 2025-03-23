<?php

/* Custom post type Conteudo */

/**
 * Registers a custom post type 'Conteudo'.
 *
 * This function sets up a custom post type called 'viagem' with various options,
 * including labels, archive support, menu position, and supported features such
 * as title, editor, and thumbnail.
 *
 * @return void
 */

function monks_setup_theme()
{
  add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'monks_setup_theme');

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
