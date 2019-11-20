const path = require('path')
const RSS = require('./node_modules/rss')
const chalk = require('./node_modules/chalk')

module.exports = (pluginOptions, ctx) => {
  return {
    name: 'rss',
    
    generated () {
      const fs = require('./node_modules/fs-extra')
      const { pages, sourceDir } = ctx
      const {
        filter = () => true,
        count = 20,
        filename = 'rss',
        dirname = '_posts'
      } = pluginOptions
      const siteData = require(path.resolve(sourceDir, '.vuepress/config.js'))

      const feed = new RSS({
        title: page.title,
        description: siteData.description,
        feed_url: `${pluginOptions.site_url}/${filename}.xml`,
        site_url: `${pluginOptions.site_url}`,
        copyright: `${pluginOptions.copyright || ''}`,
        language: pluginOptions.language || 'en',
      })
      function filterPost({ relativePath, frontmatter } = {}) {
        return (
          relativePath && relativePath.indexOf(dirname) === 0
        ) && filter(frontmatter)
      }
      const posts = pages
        .filter(filterPost)
        .map(page => ({...page, date: new Date(page.frontmatter.date || '')}))

      posts
        .sort((a, b) => b.date - a.date)
        .slice(0, count)
        .forEach(page => {
          const url = `${pluginOptions.site_url}${page.path}`
          feed.item({
            title: page.frontmatter.title,
            description: `【摘要】${page.summary || page.excerpt} <a href="${url}">阅读全文</a>`,
            url,
            date: page.date,
          })
        })

      fs.writeFile(
        path.resolve(ctx.outDir, `${filename}.xml`),
        feed.xml()
      );
      console.log(chalk.green.bold('RSS has been generated!'))
    }
  }
}