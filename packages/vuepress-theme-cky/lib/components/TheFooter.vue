<template>
  <footer class="footer">
    <a :href="rssUrl" target="_blank" class="rss">
      <RssIcon size="18"/>
    </a>
    <p>
      友情链接：
      <NavLink
        v-for="(item, index) in links"
        :key="index"
        :link="item.link"
        class="link"
      > {{ index === 0 ? '' : '| ' }}{{ item.text }}</NavLink>
    </p>
    <p>All content copyright <NavLink :link="$localePath" class="link">{{ $siteTitle }}</NavLink> © 2015 • All rights reserved.</p>
    <p>最后更新时间：{{ lastBuildTime }}</p>
    <VisitorCount type="uv"/>
    <script async src="https://cdn.jsdelivr.net/gh/xaoxuu/cdn-busuanzi@2.3/js/busuanzi.pure.mini.js"></script>
  </footer>
</template>
<script>
import VisitorCount from './VisitorCount'
import { RssIcon } from 'vue-feather-icons'

export default {
  name: 'TheFooter',
  components: { VisitorCount, RssIcon },
  computed: {
    lastBuildTime() {
      return LAST_BUILD_TIME ? (new Date(+LAST_BUILD_TIME)).toLocaleString() : '-'
    },
    links() {
      return this.$themeConfig.footer && this.$themeConfig.footer.links || []
    },
    rssUrl() {
      const { rss = {} } = this.$themeConfig
      const { site_url = '', filename = 'rss' } = rss
      return `${site_url}${filename}.xml`
    }
  }
}
</script>
<style lang="stylus" scoped>
.footer
  position: relative;
  margin: 8rem 0 0 0;
  padding: 4rem 2rem;
  border-top: #EBF2F6 1px solid;
  font-size: 0.8em;
  line-height: 1.3em;
  color: #BBC7CC;
  text-align: center;
  background: #f8f8f8;
  .rss
    position: absolute;
    top: -15px;
    left: 50%;
    height: 27px;
    width: 30px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  .link 
    color #BBC7CC
    &:hover
      color $accentColor
</style>