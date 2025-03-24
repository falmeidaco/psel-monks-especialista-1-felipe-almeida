<?php

/**
 * Registra o post customizado 'formsubmission'.
 *
 * Utilizado para armazenar as submissões do formulário
 */

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

/**
 * Personalizando a página do conteúdo personalizado 'formsubmission'.
 *
 * Desabilitando a opção de criar um novo registro pelo admin do Wordpress
 */

function monks_remove_add_new_formsubmission()
{
  global $submenu;
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