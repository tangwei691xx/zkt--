/**
 * /*
 *
 * @format
 * @Author: fanshaoyong
 * @Date: 2021-09-28 14:22:37
 * @LastEditTime: 2021-09-28 14:32:23
 * @LastEditors: Please set LastEditors
 * @Description: jsdoc3配置文件
 * @FilePath: /zkt/zkt-polyfill/docs/config.js
 */

module.exports = {
  source: {
    include: ['./'],
    exclude: ['node_modules'],
    includePattern: '.+(es6)$',
  },
  sourceType: 'module',
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  opts: {
    template: 'node_modules/docdash',
    encoding: 'utf8',
    destination: './docs/dist/static_html/zkt-polyfill',
    recurse: true,
    verbose: false,
  },
  docdash: {
    static: true, // Display the static members inside the navbar
    sort: true, // Sort the methods in the navbar
    sectionOrder: [
      // Order the main section in the navbar (default order shown here)
      'Classes',
      'Modules',
      'Externals',
      'Events',
      'Namespaces',
      'Mixins',
      'Tutorials',
      'Interfaces',
    ],
    disqus: '', // Shortname for your disqus (subdomain during site creation)
    openGraph: {
      // Open Graph options (mostly for Facebook and other sites to easily extract meta information)
      title: '', // Title of the website
      type: 'website', // Type of the website
      image: '', // Main image/logo
      site_name: 'polyfill在线文档', // Site name
      url: '', // Main canonical URL for the main page of the site
    },
    meta: {
      // Meta information options (mostly for search engines that have not indexed your site yet)
      title: 'polyfill在线文档', // Also will be used as postfix to actualy page title, prefixed with object/document name
      description: '', // Description of overal contents of your website
      keyword: '', // Keywords for search engines
    },
    search: true, // Display seach box above navigation which allows to search/filter navigation items
    commonNav: true, // Group all html code for <nav> in a nav.inc.html fetched on each page (instead of include it in each html page, save {navSize}×{nb html pages} which can be huge on big project)
    collapse: 'top', // Collapse navigation by default except current object's navigation of the current page, top for top level collapse
    wrap: true, // Wrap long navigation names instead of trimming them
    typedefs: true, // Include typedefs in menu
    navLevel: false, // depth level to show in navbar, starting at 0 (false or -1 to disable)
    private: false, // set to false to not show @private in navbar
    removeQuotes: 'all', // Remove single and double quotes, trim removes only surrounding ones
    scripts: [], // Array of external (or relative local copied using templates.default.staticFiles.include) js or css files to inject into HTML,
    ShortenTypes: true, // If set to true this will resolve the display name of all types as the shortened name only (after the final period).
    // menu: {
    //   // Adding additional menu items after Home
    //   'Project Website': {
    //     // Menu item name
    //     href: 'https://myproject.com', //the rest of HTML properties to add to manu item
    //     target: '_blank',
    //     class: 'menu-item',
    //     id: 'website_link',
    //   },
    //   Forum: {
    //     href: 'https://myproject.com.forum',
    //     target: '_blank',
    //     class: 'menu-item',
    //     id: 'forum_link',
    //   },
    // },
    scopeInOutputPath: true, // Add scope from package file (if present) to the output path, true by default.
    nameInOutputPath: true, // Add name from package file to the output path, true by default.
    versionInOutputPath: true, // Add package version to the output path, true by default.
  },
};
