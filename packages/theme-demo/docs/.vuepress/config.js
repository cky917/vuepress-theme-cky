const path = require('path')

module.exports = {
  title: '蹦蹬儿你个蹦蹬儿',
  description: '',
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}],
  ],
  markdown: {
    lineNumbers: true
  },
  theme: 'cky',
  themeConfig: {
    rss: {
      site_url: 'https://blog.chenkeyi.com/',
      filename: 'atom'
    },
    header: {
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
        { link: '###', text: '友情链接1' },
        { link: '###', text: '友情链接2' },
        { link: '###', text: '友情链接3' }
      ]
    },
    comment: {
      clientID: '',
      clientSecret: '',
      repo: '',
      owner: '',
      admin: ['']
    },
    pagination: {}
  }
}