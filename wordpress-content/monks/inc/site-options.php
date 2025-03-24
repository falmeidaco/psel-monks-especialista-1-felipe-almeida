<?php


/**
 * Adicionando opções nas configurações do site
 *
 * Adiciona o campo "Form Token" na página de configurações Gerais
 *
 */
function monks_add_form_token_setting() {
  add_settings_field(
      'form_token', 
      'Form Token',
      'render_form_token_field',
      'general'
  );

  register_setting('general', 'form_token', [
      'type' => 'string',
      // Usando função de sanitização customizada
      'sanitize_callback' => 'monks_sanitize_form_token', 
      'default' => '',
  ]);
}
add_action('admin_init', 'monks_add_form_token_setting');

// Rederiza o campo de input no painel do WordPress
function render_form_token_field() {
  $form_token = get_option('form_token', '');
  echo '<input type="text" id="form_token" name="form_token" value="' . esc_attr($form_token) . '" class="regular-text" maxlength="32">';
}

// Função customizada para limpar e limitar o campo "Form Token" a 32 caracteres
function monks_sanitize_form_token($value) {
  // Sanitiza o campo
  $value = sanitize_text_field($value); 
  // Limita a 32 caracteres
  return substr($value, 0, 32); 
}

