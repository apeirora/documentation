<script setup>
import { data } from '../data/blog-posts.data'
import { estimateReadingTime } from '../util/reading-time';
</script>

<template>
  <ul class="blog-posts">
    <li v-for="item in data">
      <BlogPost
        :title="item.frontmatter.title"
        :titleHref="item.url"
        :date="item.__date"
        :authors="item.frontmatter.authors"
        :text="item.excerpt"
        :moreHref="item.url"
        :readingTime="item.metadata.readingTime"
        />
    </li>
  </ul>
</template>

<style scoped>
.blog-posts {
  padding: 0;
}
.blog-posts li {
  display: block;
}
</style>