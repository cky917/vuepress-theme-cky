<template>
  <transition name="fade">
    <span
      class="go-to-top"
      v-show="show"
      title="回到顶部"  
      @click="scrollToTop"
    >
      
      <span
        v-if="!!this.$themeConfig.backToTopImg"
        class="icon"
        :style="{
          backgroundUrl: this.$themeConfig.backToTopImg
        }"
        ></span>
        <ChevronUpIcon v-else/>
    </span>
  </transition>
</template>

<script>
import debounce from 'lodash.debounce'
import { ChevronUpIcon } from 'vue-feather-icons'

export default {
  components: { ChevronUpIcon },
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      scrollTop: null
    }
  },
  mounted () {
    this.scrollTop = this.getScrollTop()
    const handleScroll = debounce(() => {
      this.scrollTop = this.getScrollTop()
    }, 100)
    window.addEventListener('scroll', handleScroll)
    this.$once('hook:beforeDestroyed', () => {
      window.removeEventListener('scroll', handleScroll)
    })
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  computed: {
    show () {
      return this.scrollTop > this.threshold
    }
  }
}
</script>

<style lang='stylus' scoped>
.go-to-top {
  cursor: pointer;
  position: fixed;
  bottom: 4rem;
  right: 2.5rem;
  width: 4.4rem;
  color: $accentColor;
  z-index: 1;
}
.icon
  display block
  width 4.4rem
  height 3rem
  background-position: center center
  background-size cover
.go-to-top:hover {
  color: lighten($accentColor, 30%);
}
@media (max-width: 959px) {
  .go-to-top {
    display: none;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>