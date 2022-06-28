<?php
/**
 * Plugin Name: Tangible: Loops & Logic Pro
 * Plugin URI: https://loop.tangible.one/pro
 * Description: Extend Loops & Logic with Pro features: third-party plugin integrations (Easy Digital Downloads, Events Calendar, Gravity Forms, LearnDash, LifterLMS, WooCommerce); Form module; cloud access
 * Version: 3.0.0
 * Author: Team Tangible
 * Author URI: https://teamtangible.com
 * License: GPLv2 or later
 */

define( 'TANGIBLE_LOOPS_AND_LOGIC_PRO', '3.0.0' );

require_once __DIR__ . '/vendor/tangible/plugin-framework/index.php';
require_once __DIR__ . '/vendor/tangible/template-system-pro/index.php';

/**
 * Get plugin instance
 */
function tangible_loops_and_logic_pro($instance = false) {
  static $plugin;
  return $plugin ? $plugin : ($plugin = $instance);
}

add_action('plugins_loaded', function() {

  $framework = tangible();
  $plugin    = $framework->register_plugin([
    'name'           => 'tangible-loops-and-logic-pro',
    'title'          => 'Tangible Loops & Logic Pro',
    'setting_prefix' => 'tangible_loops_and_logic_pro',

    'version'        => TANGIBLE_LOOPS_AND_LOGIC_PRO,
    'file_path'      => __FILE__,
    'base_path'      => plugin_basename( __FILE__ ),
    'dir_path'       => plugin_dir_path( __FILE__ ),
    'url'            => plugins_url( '/', __FILE__ ),
    'assets_url'     => plugins_url( '/assets', __FILE__ ),
  ]);

  tangible_loops_and_logic_pro( $plugin );

  // Features loaded will have $framework and $plugin in their scope

  require_once __DIR__.'/includes/index.php';

}, 10);
