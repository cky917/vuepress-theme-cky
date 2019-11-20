<template>
  <div class="main-div posts-list">
    <div
      v-if="listPosts.length === 0"
      key="no-posts"
      class="no-posts"
    >
      {{ $themeConfig.lang.noRelatedPosts }}
    </div>

    <div
      v-else
      class="posts-items"
    >
      <PostsListItem :post="post"  v-for="post in listPosts" :key="post.path"/>
    </div>

    <Pagination v-if="$pagination.length > 1"/>
  </div>
</template>

<script>
import Vue from 'vue'
import PostsListItem from './PostsListItem'

export default {
  name: 'PostsList',
  components: {
    PostsListItem,
  },
  data () {
    return {}
  },
  computed: {
    listPosts() {
      return this.$pagination.pages
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'
.main-div
  width 80%
  margin 0 auto
  .no-posts
    color $grayTextColor
  .posts-items
    display flex
    flex-wrap wrap
    justify-content center
</style>