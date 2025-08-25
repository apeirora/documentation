<script setup>
  const props = defineProps(['title', 'titleHref', 'date', 'authors', 'text', 'moreHref', 'readingTime'])
  import { useData, withBase } from 'vitepress';
  const { lang } = useData()

  const datetime = new Intl.DateTimeFormat(
    lang.value || undefined,
    { dateStyle: 'long'}
  )
</script>

<template>
  <article class="blog-post">
    <header>
      <h2 v-if="title">
        <a :href="withBase(titleHref)">
          {{ title }}
        </a>
      </h2>
      <div class="metadata" v-if="date">
        <time :datetime="date">{{  datetime.format(new Date(date)) }}</time> · {{ readingTime }} min read
      </div>
      <div class="authors" v-if="authors">
        <ul>
          <li v-for="author in authors">
            <div class="name">
              <a v-if="author.url" :href="author.url" target="_blank" rel="noopener noreferrer">
                {{  author.name }}
              </a>
              <span v-else>
                {{  author.name }}
              </span>
            </div>
            <div v-if="author.title" class="title">
              {{  author.title }}
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div v-if="text" v-html="text"></div>
    <footer v-if="moreHref" class="more">
      <a :href="withBase(moreHref)">Read more</a>
    </footer>
  </article>
</template>

<style scoped>
a {
  text-decoration: none;
  font-weight: inherit;
}
a:hover {
  text-decoration: underline;
}

h2 > a {
  font-weight: inherit;
}

.metadata {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.authors ul {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 0;
    margin-bottom: 0.5rem;
    display: block;
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;

    .name {
      font-weight: bold;
    }

    .title {
      font-size: 0.8rem;
      line-height: 1rem;
    }
  }
}

.more {
  text-align: right;
}
.more a {
  font-weight: bold;
}
</style>