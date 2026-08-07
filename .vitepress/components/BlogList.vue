<script setup>
import { data } from '../data/blog-posts.data'
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
        :external="!!item.external"
        :externalUrl="item.external?.externalUrl"
        :source="item.external?.source"
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