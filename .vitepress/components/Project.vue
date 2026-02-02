<script setup>
import { useSlots, computed } from 'vue'
import { withBase } from 'vitepress'
import { data as projects } from './../data/projects.data'
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

// Compute project data based on props.name or slot content
const projectData = computed(() => {
  // Prefer props.name if provided
  let projectName = props.name

  // Fall back to slot content
  if (!projectName) {
    const defaultSlot = slots.default?.()
    projectName = extractTextFromVNodes(defaultSlot)
  }

  if (!projectName) return { name: '', url: '', description: '', icon: undefined }

  const project = projects[projectName.trim()] || projects[projectName.toLowerCase().trim()]
  if (!project) {
    console.warn("Project '" + projectName + "' does not exist!")
    return { name: '', url: '', description: '', icon: undefined }
  }

  return {
    name: project.name,
    url: project.url,
    description: project.description,
    icon: project.icon ?? undefined
  }
})

const projectText = computed(() => projectData.value.name)
const projectUrl = computed(() => projectData.value.url)
const descriptionText = computed(() => projectData.value.description)
const iconSrc = computed(() => projectData.value.icon)
</script>

<template>
  <span class="project-wrap">
    <a :href="withBase(projectUrl)">
      <slot />
    </a>
    <span class="project-content">
      <span class="project-title">
        <img v-if="iconSrc" :src="withBase(iconSrc)" class="project-icon" />
        {{ projectText }}
      </span>
      {{ descriptionText }}
    </span>
  </span>
</template>

<style scoped>
.project-wrap {
  position: relative;
}

.project-icon {
  display: inline;
  height: 1.5em;
  vertical-align: -25%;
  margin-right: 0.5em;
  background-color: white;
  border-radius: 3px;
  padding: 3px;
}

.project-content {
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

.project-title {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5em;
}

.project-wrap .project-content {
  display: none;
  position: absolute;
  top: 120%;
  left: 0%;
  right: auto;
  padding: 0.3rem 0.5rem;
  min-width: 20rem;
}

.project-wrap:hover .project-content {
  display: block;
}
</style>