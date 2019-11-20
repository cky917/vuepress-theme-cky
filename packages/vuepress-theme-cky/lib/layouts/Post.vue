<template>
  <div class="post-container">
    <h1 class="title">{{ $page.title }}</h1>
    <PostInfo :post="$page" class="info"/>
    <Content class="post-content"/>
    <Toc class="toc"/>
    <div class="pagination" v-if="$pagination">
      <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink">Prev</router-link>
      <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink">Next</router-link>
    </div>
    <Comment class="comment"/>
  </div>
</template>
<script>
import Comment from '../components/Comment'
import PostInfo from '../components/PostInfo'
import Toc from '../components/Toc'

export default {
  name: 'Post',
  components: { Comment, PostInfo, Toc },
}
</script>
<style lang="stylus" scoped>
.post-container
  position relative
  width 90%
  max-width 850px
  margin 0 auto
  .toc
    position absolute
    top 20px
    left -15em
  h1.title
    font-size: 1.5em;
    color: #333;
    line-height: 1.3;
    position: relative;
    font-weight: bold
  .post-content
    font-size 0.9em
    line-height 2
    >>> img
      max-width 100%
</style>