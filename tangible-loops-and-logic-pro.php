<?php
/**
 * Plugin Name: Tangible: Loops & Logic Pro
 * Plugin URI: https://loop.tangible.one/pro
 * Description: Extend Loops & Logic with Pro features: third-party plugin integrations (Easy Digital Downloads, Events Calendar, Gravity Forms, LearnDash, LifterLMS, WooCommerce)
 * Version: 3.0.6
 * Author: Team Tangible
 * Author URI: https://teamtangible.com
 * License: GPLv2 or later
 */
use tangible\framework;
use tangible\updater;

define( 'TANGIBLE_LOOPS_AND_LOGIC_PRO_VERSION', '3.0.6' );

$module_path = is_dir(
  ($path = __DIR__ . '/../../tangible') // Module
) ? $path : __DIR__ . '/vendor/tangible'; // Plugin

require_once $module_path . '/framework/index.php';
require_once $module_path . '/betterdash/index.php';
require_once $module_path . '/betterlifter/index.php';
require_once $module_path . '/template-system/index.php';
require_once $module_path . '/template-system-pro/index.php';
require_once $module_path . '/fields/index.php';
require_once $module_path . '/fields-pro/index.php';
require_once $module_path . '/updater/index.php';

/**
 * Get plugin instance
 */
function tangible_loops_and_logic_pro($instance = false) {
  static $plugin;
  return $plugin ? $plugin : ($plugin = $instance);
}

add_action('plugins_loaded', function() {

  $plugin    = framework\register_plugin([
    'name'           => 'tangible-loops-and-logic-pro',
    'title'          => 'Loops & Logic Pro',
    'setting_prefix' => 'tloopslogicpro',

    'version'        => TANGIBLE_LOOPS_AND_LOGIC_PRO_VERSION,
    'file_path'      => __FILE__,
    'base_path'      => plugin_basename( __FILE__ ),
    'dir_path'       => plugin_dir_path( __FILE__ ),
    'url'            => plugins_url( '/', __FILE__ ),
    'assets_url'     => plugins_url( '/assets', __FILE__ ),
  ]);

  framework\register_plugin_dependencies($plugin, [
    'title' => 'Loops & Logic',
    'url' => 'https://loopsandlogic.com/',
    'active' => function_exists('tangible_loops_and_logic'),
  ]);

  tangible_loops_and_logic_pro( $plugin );

  updater\register_plugin([
    'name' => $plugin->name,
    'file' => __FILE__,
    // 'license' => ''
  ]);

  if (!framework\has_all_plugin_dependencies($plugin)) return;

  // Features loaded will have $framework and $plugin in their scope

  require_once __DIR__.'/includes/index.php';

}, 10);
