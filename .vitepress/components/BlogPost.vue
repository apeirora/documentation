<script setup>
  const props = defineProps(['title', 'titleHref', 'date', 'authors', 'text', 'moreHref', 'readingTime', 'external', 'externalUrl', 'source'])
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
        <a v-if="external" :href="externalUrl" target="_blank" rel="noopener noreferrer">{{ title }}</a><span
          v-if="external" class="ext-marker" title="This post was published on an external site">External <span aria-hidden="true">↗</span><span class="vp-sr-only"> (external, opens in new tab)</span></span>
        <a v-else :href="withBase(titleHref)">
          {{ title }}
        </a>
      </h2>
      <div class="metadata" v-if="date">
        <template v-if="external">Published on {{ source }} · </template>
        <time :datetime="date">{{ datetime.format(new Date(date)) }}</time>
        <template v-if="readingTime != null"> · {{ readingTime }} min read</template>
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
              <a v-if="author.titleUrl" :href="author.titleUrl" target="_blank" rel="noopener noreferrer">
                {{  author.title }}
              </a>
              <span v-else>
                {{  author.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div v-if="text" v-html="text"></div>
    <footer v-if="external || moreHref" class="more">
      <a v-if="external" :href="externalUrl" target="_blank" rel="noopener noreferrer">
        Read more on external site <span aria-hidden="true">↗</span><span class="vp-sr-only"> (opens in new tab)</span>
      </a>
      <a v-else :href="withBase(moreHref)">Read more</a>
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

/* External post badge - subtle gray, badge-shaped, sits outside the title link
   so hovering the headline underlines only the title, not the badge. Matches the
   sidebar EXT badge. */
.ext-marker {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  background: var(--vp-c-gray-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 2px 7px;
  margin-left: 8px;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.4;
}
</style>
