<?php
// local $plugin

// Enqueue frontend styles and scripts

add_action('wp_enqueue_scripts', function() use ($plugin) {

  $url = $plugin->url;
  $version = $plugin->version;
/*
  wp_enqueue_style(
    'tangible-loops-and-logic-pro',
    $url . 'assets/build/tangible-loops-and-logic-pro.min.css',
    [],
    $version
  );

  wp_enqueue_script(
    'tangible-loops-and-logic-pro',
    $url . 'assets/build/tangible-loops-and-logic-pro.min.js',
    ['jquery'],
    $version
  );
*/
});
