<template>
  <div class="blog-tags">
    <NavLink
      class="blog-tag"
      v-for="tag in tags"
      :key="tag.name"
      :link="tag.path"
    >
      {{ tag.name }} ({{ tag.pages.length }})
    </NavLink>
  </div>
</template>

<script>

export default {
  props: ['tags']
}
</script>

<style lang="stylus">
.blog-tags
  width 66%
  margin 5rem auto
  display flex
  flex-wrap wrap
  font-size 0.9em
  .blog-tag
    margin 5px 10px
    color: #666;
    padding: 10px 13px;
    border: 1px solid #ddd;
    border-radius: 3px;
    &:hover
      background: #f9f9f9;
</style>