<template>
  <span class="visitor-count">
    <span id="busuanzi_container_site_uv" v-if="type === 'uv'">
      本站访客数<span id="busuanzi_value_site_uv">
        <LoaderIcon class="load-icon"/>
      </span>人次
    </span>
    <span id="busuanzi_container_page_pv" v-if="type === 'pv'">
      阅读量：
      <span id="busuanzi_value_page_pv">
        <LoaderIcon class="load-icon"/>
      </span>
    </span>
  </span>
</template>
<script>
import { LoaderIcon } from 'vue-feather-icons'

export default {
  name: 'VisitorCount',
  components: { LoaderIcon },
  props: {
    type: String,
    validae(val) {
      return ['uv', 'pv']
    }
  },
  mounted() {
    if (window.bszCaller && window.bszTag) {
      bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function (result) {
        bszTag.texts(result), bszTag.shows()
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@keyframes rotate
  from
    transform rotate(0)
  to
    transform rotate(360deg)
  

.visitor-count
  .load-icon
    vertical-align: text-top;
    height 1rem
    width 1rem
    animation rotate 4s linear infinite
</style>