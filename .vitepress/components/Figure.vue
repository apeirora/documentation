<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
const props = defineProps(['src', 'alt', 'caption', 'width', 'source', 'sourceLink', 'href'])

const srcVal = computed(() => withBase(props.src))
const altVal = computed(() => props.alt || props.caption || '')
const captionVal = computed(() => props.caption || props.alt || '')
const hrefVal = computed(() => props.href ? withBase(props.href) : '')
</script>

<template>
  <figure>
    <a v-if="hrefVal" :href="hrefVal" target="_blank" rel="noopener noreferrer">
      <img :src="srcVal" :alt="altVal" />
    </a>
    <img v-else :src="srcVal" :alt="altVal" />
    <figcaption>
      {{ captionVal }}
      <div class="source" v-if="sourceLink">
        (Source: <a href="{{ sourceLink }}">{{ source ? source : sourceLink }}</a>)
      </div>
      <div class="source" v-else-if="source">
        (Source: {{ source }})
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  margin: 2rem auto;
  width: 100%;
  text-align: center;
}
figure img {
  display: inline;
  margin: .25rem 0;
}
figcaption {
  font-size: .8rem;
  padding: 0 .5rem;
  text-align: center;
}
figcaption .source {
  display: block;
}
</style>