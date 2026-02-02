<script setup>
import { useSlots, computed } from 'vue'
import { withBase } from 'vitepress'
import { data as terms } from './../data/terms.data'
const props = defineProps(['name'])

const slots = useSlots()

// Helper to extract text from VNodes recursively
const extractTextFromVNodes = (vnodes) => {
  if (!vnodes) return ''
  return vnodes.map(vnode => {
    if (typeof vnode === 'string') return vnode
    if (typeof vnode.children === 'string') return vnode.children
    if (Array.isArray(vnode.children)) return extractTextFromVNodes(vnode.children)
    return ''
  }).join('')
}

// Compute term data based on props.name or slot content
const termData = computed(() => {
  // Prefer props.name if provided
  let termName = props.name

  // Fall back to slot content
  if (!termName) {
    const defaultSlot = slots.default?.()
    termName = extractTextFromVNodes(defaultSlot)
  }

  if (!termName) return { url: '', description: '' }

  let term = terms[termName.trim()] || terms[termName.toLowerCase().trim()]
  if (!term) {
    console.warn("Term '" + termName + "' does not exist!")
    return { url: '', description: '' }
  }

  if ("alias" in term) {
    term = terms[term.alias.trim()]
    if (!term) {
      console.warn("Term '" + termName + "' does not exist (via alias)!")
      return { url: '', description: '' }
    }
  }

  return { url: term.url, description: term.description }
})

const termUrl = computed(() => termData.value.url)
const descriptionText = computed(() => termData.value.description)
// Note: .term-content shouldn't be a span
// but for some reason, div caused some side-
// effects that did not show up during local
// dev preview; see #163
</script>

<template>
  <abbr class="term-wrap">
    <a :href="withBase(termUrl)">
      <slot />
    </a>
    <span class="term-content">
      {{ descriptionText }}
    </span>
  </abbr>
</template>

<style scoped>
.term-wrap {
  position: relative;
}

.term-content {
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: initial;
  font-style: initial;
  backdrop-filter: blur(4px);
  background: rgba(var(--apeiro-blue-primary), 0.8);
  color: white;
  box-shadow: var(--custom-shadow);
  z-index: 100;
}

.term-wrap .term-content {
  display: none;
  position: absolute;
  top: 120%;
  left: 0%;
  right: auto;
  padding: 0.3rem 0.5rem;
  min-width: 20rem;
}

.term-wrap:hover .term-content {
  display: block;
}

.term-wrap > a {
  text-decoration: underline dotted;
}
</style>