<template>
  <div id="vuperess-theme-blog__tags-layout">
    <BlogTags :tags="$frontmatterKey.list"/>
  </div>
</template>

<script>
import BlogTags from '../components/BlogTags'
export default {
  name: 'FrontMatterKey',
  components: { BlogTags }
}
</script>