<?php

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