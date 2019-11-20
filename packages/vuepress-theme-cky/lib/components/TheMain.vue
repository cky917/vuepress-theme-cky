<template>
  <div class="container" :class="containerClass">
    <aside class="aside">
      <InfoCard class="main-div" />
    </aside>
    <main class="main">
      <transition name="fade" mode="out-in" appear>
        <component
          :is="layout"
          :key="$page.path"
        />
      </transition>
    </main>
  </div>
 
</template>
<script>
import Layout from '../layouts/Layout'
import InfoCard from './InfoCard'
import PostNavCard from './PostNavCard'

export default {
  name: 'TheMain',
  components: { Layout, InfoCard, PostNavCard },
  computed: {
    layout() {
      const layout = this.$page.frontmatter.layout
      if (layout && (this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))) {
        return layout
      }
      if (!this.$page.path) {
        return 'NotFound'
      }
      return 'Layout'
    },
    showAside () {
      if ('aside' in this.$page.frontmatter) {
        return this.$page.frontmatter.aside
      }
      return false
    },
    isPostPage() {
      return this.$page.id === 'post'
    },
    containerClass () {
      return {
        'show-aside': this.showAside,
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  position relative
  max-width $MQWide
  margin 1rem auto
  .aside
    position relative
    padding 20px;
  @media (max-width $MQMobile - 1px)
    margin 0.5rem auto
  &:not(.show-aside)
    .main
      width 100%
    .aside
      display none
  &.show-aside
    @media (min-width $MQWide)
      .main
        width 85%
      .aside
        width 15%
    @media (max-width $MQWide - 1px) and (min-width $MQMobile)
      .main
        width 80%
      .aside
        width 20%
    @media (min-width $MQMobile)
      .main
        float left
      .aside
        float left
        padding-right 1rem
    @media (max-width $MQMobile - 1px)
      .main
        width 100%
      .aside
        display none
</style>