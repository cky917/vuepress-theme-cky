<template>
  <div>
    <nav class="navbar" :class="{
      fixed: this.fixed
    }">
      <div class="container">
        <router-link :to="$localePath">
          <span class="navbar-title" v-if="$siteTitle">{{ $siteTitle }}</span>
        </router-link>
        <SearchBox class="search-box"/>
        <div class="navbar-toggler" @click="showNavLinks = !showNavLinks">
          <MenuIcon size="1.2x"/>
        </div>
        <div
          class="navbar-links"
          :class="{
            'show': showNavLinks,
          }"
        >
          <template v-for="nav of $themeConfig.nav">
            <RouterLink
              v-if="!isExternal(nav.link)"
              :key="nav.text"
              :to="nav.link"
              class="navbar-link"
              :exact="nav.exact || false"
              @click.native="showNavLinks = false"
            >
              {{ nav.text }}
            </RouterLink>

            <a
              v-else
              :key="nav.text"
              :href="nav.link"
              class="navbar-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ nav.text }}
            </a>
          </template>
        </div>
      </div>
    </nav>
    <div
      v-show="fixed"
      class="navbar-holder"
    />
  </div>
</template>
<script>
import { MenuIcon } from 'vue-feather-icons'
import throttle from 'lodash.throttle'
import SearchBox from '@vuepress/plugin-search/SearchBox.vue'

export default {
  name: 'TheHeaderNavBar',
  components: { MenuIcon, SearchBox },
  data() {
    return {
      fixed: false,
      showNavLinks: false
    }
  },
  mounted() {
    window.addEventListener('scroll', throttle(() => {
      this.fixed = window.scrollY !== 0
    }), 100)
  },
  methods: {
    isExternal(link) {
      return /^(https?:|mailto:|tel:)/.test(link)
    }
  }
}
</script>
<style lang="stylus" scoped>

$gutter = 0.7rem
$lineHeight = $navbarHeight - ($gutter * 2)

.navbar-holder
  position relative
  height $navbarHeight
.navbar
  position relative
  z-index 20
  left 0
  right 0
  top 0
  box-sizing border-box
  height $navbarHeight
  line-height $lineHeight
  padding $gutter $gutter * 2
  color $textColor
  background-color alpha($navbarColor, 0.8)
  transition all 0.5s ease-out
  &.fixed
    position fixed
  .navbar-title
    color $headerTextColor
  .search-box
    margin-left 1rem
  .navbar-toggler
    float right
    cursor pointer
    color $headerTextColor
    box-sizing border-box
    width $lineHeight
    border-radius 50%
    border solid 2px transparent
    text-align center
    z-index 100
    .icon
      fill $accentColor
    @media (max-width $MQMobile - 1px)
      display inline
    @media (min-width $MQMobile)
      display none
  .navbar-links
    @media (max-width $MQMobile - 1px)
      &.show
        display block
      display none
      position fixed
      top $navbarHeight
      right 0
      text-align center
      padding $gutter 2rem
      border 1px solid $borderColor
      border-top none
      background-color alpha($navbarColor, 0.8)
      z-index 100
      transition all 0.5s ease-out
    @media (min-width $MQMobile)
      float right
      margin 0
      padding 0
      line-height $lineHeight
      list-style none
  .navbar-link
    color alpha($headerTextColor, 0.6)
    transition all 0.3s
    border-bottom 2px solid transparent
    &:hover
    &.router-link-active
      border-bottom 2px solid $accentColor
      color $headerTextColor
    @media (max-width $MQMobile - 1px)
      display block
    @media (min-width $MQMobile)
      display inline-block
      height 100%
      padding 0 0.25rem
      margin-left 1rem
      margin-bottom -10px
</style>