<template>
  <Affix :offsetTop="headHeight + 50">
    <div
      v-show="visible"
      class="toc"
      >
      <div class="toc-title">文章目录</div>
      <div class="toc-box">
        <div class="toc-lists">
          <div class="toc-item"
            ref="chairTocItem"
            v-for="(toc, index) in tocList"
            :class="[ `toc-h${toc.level}`, { active: activeIndex === index } ]"
            :key="index">
            <a :href="`#${toc.slug}`"
              :title="toc.title">
              {{ toc.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Affix>
</template>

<script>
import Affix from './Affix'
import throttle from 'lodash.throttle'

// get offset top
function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
    document.body.scrollTop +
    document.documentElement.scrollTop
    : 0;
}
export default {
  name: 'Toc',
  components: { Affix },
  data() {
    return {
      activeIndex: 0,
      headHeight: 0
    };
  },
  mounted() {
    this.headHeight = document.querySelector('.header').offsetHeight + 20
    this.eventHandler()
  },
  computed: {
    visible() {
      return (
        this.$frontmatter &&
        this.$frontmatter.toc !== false &&
        !!(this.tocList.length)
      );
    },
    tocList() {
      return this.$page && this.$page.headers && this.$page.headers || []
    }
  },
  watch: {
    activeIndex(index) {
      const activeToc = this.$refs.chairTocItem[index]
      activeToc.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  },
  methods: {
    eventHandler() {
      const throttled = throttle(() => {
        if (this.visible) {
          this.checkActiveToc()
        }
      }, 100)
      window.addEventListener('scroll', throttled)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', throttled)
      })
    },
    checkActiveToc() {
      const headings = this.$page.headers || []
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      const viewHeight = window.innerHeight - this.headHeight

      const addLink = index => {
        this.activeIndex = index;
      }

      for (let i = 0; i < headings.length; i++) {
        const dom = document.getElementById(headings[i].slug);
        const top = getAbsoluteTop(dom);
        const distance = top - scrollTop

        if (distance < (viewHeight / 2)) {
          addLink(i);
        } else {
          if (!i) addLink(i);
          break;
        }
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.toc
  line-height 1.5
  width: 10rem
  font-size: 12px
  z-index: 100;
  border-radius: 5px;
  transition .3s ease all
  .toc-title
    text-align: left;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom 20px
  .toc-box
    position: absolute;
    height: 400px;
    width: 100%;
    overflow: auto;
  .toc-lists
    position: absolute;
    margin-bottom: 1rem;
    border-left: 3px solid #ccc;
    padding-left: 0;
    padding-right: 10px;
    margin-top: 0;
  .toc-item
    cursor: pointer;
    word-break: break-all;
    margin-bottom 10px
    &.active
      position: relative;
      left: -3px;
      background: #f3f3f3;
      border-left: 3px solid #3498DB;
    a
      transition:.3s ease all;  
      color $textColor
      &:hover
        color: $accentColor;
        outline: none;

for i in range(2, 6)
  .toc-h{i}
    padding-left: 0.5rem * (i - 1);
</style>