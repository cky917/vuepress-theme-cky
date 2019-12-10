<template>
  <div class="my-pagination">
    <span>Page {{ currentIndex }} of {{ $pagination.length }}</span>
    <NavLink
      v-if="$pagination.hasPrev"
      :link="$pagination.prevLink"
      class="pagination-link prev large">← Newer Posts</NavLink>
    <NavLink
      v-if="$pagination.hasNext"
      :link="$pagination.nextLink"
      class="pagination-link next large"
    >Older Posts →</NavLink>
    <NavLink
      v-if="$pagination.hasPrev"
      :link="$pagination.prevLink"
      class="pagination-link prev small">←</NavLink>
    <NavLink
      v-if="$pagination.hasNext"
      :link="$pagination.nextLink"
      class="pagination-link next small"
    >→</NavLink>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  computed: {
    currentIndex() {
      return this.$pagination.paginationIndex + 1
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-pagination
  margin-top: 3rem
  position relative
  font-size 0.9rem
  text-align center
  color $paginationColor
  height: 2rem;
  line-height: 2rem;
  .pagination-link
    position absolute
    top: 0;
    padding: 2px 15px;
    border: $borderColor 2px solid;
    line-height 1.4
    text-decoration: none;
    border-radius: 30px;
    transition: all ease 0.3s;
    color $paginationColor
    &:hover
      border-color $paginationColor
      color $paginationAccentColor
    &.prev
      left 10px
    &.next
      right 10px
  @media (max-width $MQMobile - 1px)
    .small
      display: block
    .large
      display: none
  @media (min-width $MQMobile)
    .small
      display: none
    .large
      display: block
</style>
</style>