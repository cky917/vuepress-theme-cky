const removeMd = require('remove-markdown')

function getSummary(strippedContent, summaryLength) {
  if (!strippedContent) {
    return
  }
  return removeMd(
    strippedContent
      .trim()
      .replace(/^#+\s+(.*)/, '')
      .slice(0, summaryLength)
  )
}

module.exports = (options, ctx) => {
  // set default theme config
  options = Object.assign({}, {
    summary: true,
    summaryLength: 200,
    pwa: false,
  }, options)

  const defaultBlogPluginOptions = {
    globalPagination: {
      itemLayout: 'Post',
      itemPermalink: '/:year/:month/:day/:slug',
      pagination: {
        lengthPerPage: 10
      },
    },
    directories: [
      {
        id: 'post',
        dirname: '_posts',
        // layout: 'IndexPost', defaults to `Layout.vue`
        itemLayout: 'Post',
        path: '/',
        pagination: {
          sorter: (prev, next) => {
            function getTime(page) {
              return page.frontmatter.date
                ? new Date(page.frontmatter.date).getTime()
                : page.lastUpdated
            }
            const prevTime = getTime(prev)
            const nextTime = getTime(next)
            return prevTime - nextTime > 0 ? -1 : 1
          }
        },
      },
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ['tag', 'tags'],
        path: '/tag/',
        layout: 'FrontMatterKey',
        scopeLayout: 'Layout'
      }
    ]
  }
  const { modifyBlogPluginOptions } = options

  const blogPluginOptions = typeof modifyBlogPluginOptions === 'function'
    ? modifyBlogPluginOptions(defaultBlogPluginOptions)
    : defaultBlogPluginOptions

  const plugins = [
    '@vuepress/plugin-nprogress',
    ['@vuepress/medium-zoom', {
      selector: '.post-content :not(a) > img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }],
    ['@vuepress/last-updated', {
      transformer: (timestamp) => timestamp
    }],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    [
      '@vuepress/blog',
      blogPluginOptions,
    ]
  ]
  if (options.rss) {
    const {
      count = 20,
      dirname = '_posts',
      filename = 'rss',
      copyright = '',
      site_url,
    } = options.rss
    plugins.push(
      [
        'vuepress-plugin-blogrss',
        {
          base_url: '/', // required
          site_url, // required
          copyright, // optional
          filename,
          dirname,
          // How much articles
          count
        }
      ]
    )
  }
  if (options.pwa) {
    plugins.push(
      ['@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: true
      }],
    )
  }

  const config = {
    name: 'vuepress-theme-cky',
    plugins,
    define: {
      LAST_BUILD_TIME: Date.now(),
      THEME_BLOG_PAGINATION_COMPONENT: options.paginationComponent
        ? options.paginationComponent
        : 'Pagination'
    }
  }

  /**
   * Generate summary.
   */
  config.extendPageData = function (pageCtx) {
    if (options.summary) {
      // excerpt first
      const summaryContent = pageCtx.excerpt || pageCtx._strippedContent
      pageCtx.summary = getSummary(summaryContent, options.summaryLength)
    }
  }
  return config
}