<script setup>
import { useSlots, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as projects } from './../data/projects.data'
const props = defineProps(['name'])

const slots = useSlots()
const projectText = ref('')
const projectUrl = ref('')
const descriptionText = ref('')
const iconSrc = ref('')

const getProjectName = () => {
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
  const projectName = getProjectName()

  const project =  projects[projectName.trim()] || projects[projectName.toLowerCase().trim()];
  if (!project) {
    throw new Error("Project '" + project + "' does not exist!");
  }

  projectText.value = projectName
  projectUrl.value = project.url
  descriptionText.value = project.description
  iconSrc.value = project.icon ?? undefined
})
</script>

<template>
  <span class="project-wrap">
    <a :href="withBase(projectUrl)">
      <slot />
    </a>
    <div class="project-content">
      <div class="project-title">
        <img v-if="iconSrc" :src="withBase(iconSrc)" class="project-icon" />
        {{ projectText }}
      </div>
      {{ descriptionText }}
    </div>
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