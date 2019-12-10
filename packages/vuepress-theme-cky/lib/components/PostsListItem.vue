<template>
  <div class="post-list-item">
    <h3 class="post-title">
      <NavLink :link="post.path">{{ post.title }}</NavLink>
    </h3>
    
    <p class="post-summary">
      {{ post.frontmatter.summary || post.summary }}
      <NavLink :link="post.path" class="read-more">  ... [read more]</NavLink>
    </p>
    <PostInfo :post="post" :isSinglePage="false"/>
  </div>
</template>
<script>
import { NavigationIcon, ClockIcon } from 'vue-feather-icons'
import PostInfo from './PostInfo'

export default {
  name: 'PostListItem',
  components: {  NavigationIcon, ClockIcon, PostInfo },
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.post-list-item
  position relative
  border-bottom 1px solid #eaeaea
  padding 1rem 2rem
  margin 10px
  word-break break-all
  transition: .3s ease all
  width 100%
  overflow hidden
  &:hover
    box-shadow: 0 2px 6px 2px #eee
  .read-more
    color $accentColor
  .post-title
    font-size 1.5rem
    line-height 1.3
  .post-summary
    font-size 0.8em
    line-height 1.8
</style>