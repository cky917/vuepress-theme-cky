<template>
  <header class="header" :style="styles">
    <TheHaderNavBar/>
  </header>
</template>
<script>
import TheHaderNavBar from './TheHeaderNavbar'
import TheHaderBanner from './TheHeaderBanner'

export default {
  name: 'TheHeader',
  components: { TheHaderNavBar, TheHaderBanner },
  computed: {
    showTitle () {
      return this.$frontmatter['header-title'] !== false && this.$themeConfig.header.showTitle !== false
    },
    backgroundConfig () {
      return this.$themeConfig.header.background || {}
    },
    backgroundImg () {
      // frontmatter > themeConfig
      return this.$frontmatter['header-image'] || this.backgroundConfig.url || null
    },
    styles() {
      if (this.backgroundImg) {
        let url = this.backgroundImg
        // randomly select an image if an array is provided
        if (Array.isArray(url)) {
          url = this.randomArr(url)
        }
        return {
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-attachment': 'scroll',
          'background-image': `url(${url})`,
        }
      }
      return {}
    }
  }
}
</script>
<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.header
  background $headerColor
  transition all 0.5s ease-in-out
  .subtitle
    color $headerSubtitleColor
    font-size 1em
</style>