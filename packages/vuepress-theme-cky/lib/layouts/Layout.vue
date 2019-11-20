<template>
  <div>
    <PostList v-if="$pagination"/>
    <Content v-else/>
  </div>
</template>

<script>
import PostList from '../components/PostsList'

export default {
  name: 'Layout',
  components: { PostList }
}
</script>