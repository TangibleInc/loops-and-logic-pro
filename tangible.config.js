export default {
  build: [
    // Frontend - See includes/enqueue.php

    // {
    //   src: 'assets/src/index.js',
    //   dest: 'assets/build/tangible-loops-and-logic-pro.min.js'
    // },
    // {
    //   src: 'assets/src/index.scss',
    //   dest: 'assets/build/tangible-loops-and-logic-pro.min.css'
    // },

    // Admin

    {
      src: 'assets/src/admin.scss',
      dest: 'assets/build/admin.min.css',
    },
  ],
  format: ['**/*.{php,js,json,scss}', '!assets/build'],
  archive: {
    root: 'tangible-loops-and-logic-pro',
    src: [
      '*.php',
      'assets/**',
      'includes',
      'vendor/tangible/**',
      'readme.txt'
    ],
    dest: 'publish/tangible-loops-and-logic-pro.zip',
    exclude: [
      'assets/src',
      '**/tests',
      '**/*.scss',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx'
    ],
  },
  /**
   * Dependencies for production are installed in `vendor/tangible`,
   * included in the zip package to publish. Those for development are
   * in `tangible-dev`, excluded from the archive.
   *
   * In `.wp-env.json`, these folders are mounted to the virtual file
   * system for local development and testing.
   */
  install: [
    {
      git: 'git@github.com:tangibleinc/betterdash-module',
      dest: 'vendor/tangible/betterdash',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/betterlifter-module',
      dest: 'vendor/tangible/betterlifter',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/blocks',
      dest: 'vendor/tangible-dev/blocks',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/blocks-editor',
      dest: 'vendor/tangible-dev/blocks-editor',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/fields',
      dest: 'vendor/tangible/fields',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/fields-pro',
      dest: 'vendor/tangible/fields-pro',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/framework',
      dest: 'vendor/tangible/framework',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/loops-and-logic',
      dest: 'vendor/tangible-dev/loops-and-logic',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/template-system',
      dest: 'vendor/tangible/template-system',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/template-system-pro',
      dest: 'vendor/tangible/template-system-pro',
      branch: 'main',
    },
    {
      git: 'git@github.com:tangibleinc/updater',
      dest: 'vendor/tangible/updater',
      branch: 'main',
    },
  ],
  installDev: [
    // Third-party plugins
    {
      zip: 'https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip',
      dest: 'vendor/tangible-dev/advanced-custom-fields',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/beaver-builder-lite-version.latest-stable.zip',
      dest: 'vendor/tangible-dev/beaver-builder-lite-version',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/elementor.latest-stable.zip',
      dest: 'vendor/tangible-dev/elementor',
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/easy-digital-downloads.latest-stable.zip',
      dest: 'vendor/tangible-dev/easy-digital-downloads'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/the-events-calendar.latest-stable.zip',
      dest: 'vendor/tangible-dev/the-events-calendar'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/lifterlms.latest-stable.zip',
      dest: 'vendor/tangible-dev/lifterlms'
    },
    {
      zip: 'https://downloads.wordpress.org/plugin/woocommerce.latest-stable.zip',
      dest: 'vendor/tangible-dev/woocommerce'
    },
  ],
}
