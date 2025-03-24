<?php

include_once "inc/post-type.php";
include_once "inc/custom-api.php";
include_once "inc/site-options.php";
include_once "inc/term-options.php";

/**
 * Setup do tema
 *
 * Habilita suporte para thumbnails e registra os menus.
 */
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