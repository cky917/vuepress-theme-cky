<template>
  <div id="gitalk-container"></div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default {
  name: 'Comment',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const commentConfig = this.$themeConfig.comment
      if (!commentConfig) return
      const gitalk = new Gitalk({
        clientID: commentConfig.clientID,
        clientSecret: commentConfig.clientSecret,
        repo: commentConfig.repo || '',
        owner: commentConfig.owner || '',
        admin: commentConfig.admin || [],
        id: this.$page.path,      // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
    }
  }
}

</script>
