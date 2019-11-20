# vuepress-theme-cky

一个简单，功能完善的vuepress博客主题

示例：[blog.chenkeyi.com](https://blog.chenkeyi.com)

## 使用

```bash
yarn add vuepress-theme-cky
# or
npm install vuepress-theme-cky --save
```

in `.vuepress/config.js`

```js
module.exports = {
  ...
  theme: 'cky', // required
  themeConfig: {
    // rss(optional)
    rss: {
      site_url: 'blog.chenkeyi.com', // your blog server domain, required
      filename: 'atom' // rss filename, default: rss, optional
    },
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Tags',
        link: '/tag'
      },
      {
        text: 'About Me',
        link: '/about-me'
      },
      {
        text: 'Github',
        link: 'https://github.com/cky917/action-blog'
      }
    ],
    lang: {
      noRelatedPosts: '没有文章'
    },
    footer: {
      links: [
        { link: 'https://xxx.xxx.com', text: '友情链接1' },
      ]
    },
    // gitalk options
    // see: https://github.com/gitalk/gitalk
    comment: {
      clientID: '',
      clientSecret: '',
      repo: 'your blog github repo',
      owner: '',
      admin: ['']
    }
  }
}
```
