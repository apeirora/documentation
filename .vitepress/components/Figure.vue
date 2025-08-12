<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
const props = defineProps(['src', 'alt', 'caption', 'width', 'source', 'sourceLink'])

const srcVal = computed(() => withBase(props.src))
</script>

<template>
  <figure>
    <!-- TODO: fix base path -->
    <img :src="srcVal" :alt="alt" />
    <figcaption>
      {{ caption }}
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
figure > img {
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