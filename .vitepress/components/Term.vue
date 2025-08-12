<script setup>
import { useSlots, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as terms } from './../data/terms.data'
const props = defineProps(['name'])

const slots = useSlots()
const termText = ref('')
const termUrl = ref('')
const descriptionText = ref('')

const getTermName = () => {
  const defaultSlot = slots.default?.()
  if (props.name) {
    return props.name
  } else if (defaultSlot && defaultSlot.length > 0) {
    // Convert the slot's VNode(s) into plaintext
    return defaultSlot.map(vnode => {
      // If it's a text vnode
      if (typeof vnode.children === 'string') {
        return vnode.children
      }
      return ''
    }).join('')
  } else {
    return null
  }
}

onMounted(() => {
  const termName = getTermName()
  const defaultSlot = slots.default?.()

  let term = terms[termName.trim()] || terms[termName.toLowerCase().trim()];
  if (!term) {
    throw new Error("Term '" + termName + "' does not exist!");
  }

  if ("alias" in term) {
    term = terms[term.alias.trim()];
    if (!term) {
      throw new Error("Term '" + termName + "' does not exist (via alias)!");
    }
  }

  termText.value = termName
  termUrl.value = term.url
  descriptionText.value = term.description
})
</script>
<template>
  <abbr class="term-wrap">
    <a :href="withBase(termUrl)">
      {{ termText }}
    </a>
    <div class="term-content">{{ descriptionText }}</div>
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