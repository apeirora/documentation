<script setup>
import { useSlots, computed, ref, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { data as projects } from './../data/projects.data'
const props = defineProps(['name'])

const slots = useSlots()
const wrapRef = ref(null)
const popoverRef = ref(null)
const visible = ref(false)
const popoverPos = ref({ top: 0, left: 0 })

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

async function showPopover() {
  if (wrapRef.value) {
    const rect = wrapRef.value.getBoundingClientRect()
    popoverPos.value = {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX
    }
  }
  visible.value = true

  await nextTick()

  if (popoverRef.value && wrapRef.value) {
    const popRect = popoverRef.value.getBoundingClientRect()
    const trigRect = wrapRef.value.getBoundingClientRect()

    // Flip above if bottom edge overflows viewport
    if (popRect.bottom > window.innerHeight) {
      popoverPos.value = {
        ...popoverPos.value,
        top: trigRect.top + window.scrollY - popRect.height - 4
      }
    }

    // Shift left if right edge overflows viewport
    if (popRect.right > window.innerWidth) {
      popoverPos.value = {
        ...popoverPos.value,
        left: window.scrollX + window.innerWidth - popRect.width - 8
      }
    }
  }
}

function hidePopover() {
  visible.value = false
}
</script>

<template>
  <span class="project-wrap" ref="wrapRef" @mouseenter="showPopover" @mouseleave="hidePopover">
    <a v-if="projectUrl" :href="withBase(projectUrl)">
      <slot />
    </a>
    <span v-else class="project-no-link"><slot /></span>
    <Teleport to="body">
      <span v-if="visible" ref="popoverRef" class="project-popover" :style="{ top: popoverPos.top + 'px', left: popoverPos.left + 'px' }">
        <span class="project-popover-title">
          <img v-if="iconSrc" :src="withBase(iconSrc)" class="project-popover-icon" />
          {{ projectText }}
        </span>
        {{ descriptionText }}
      </span>
    </Teleport>
  </span>
</template>

<style scoped>
.project-wrap {
  position: relative;
}

.project-no-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: default;
}
</style>

<style>
.project-popover {
  position: absolute;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: initial;
  font-style: initial;
  backdrop-filter: blur(4px);
  background: rgba(var(--apeiro-blue-primary), 0.8);
  color: white;
  box-shadow: var(--custom-shadow);
  z-index: 9999;
  padding: 0.3rem 0.5rem;
  min-width: 20rem;
  max-width: 25rem;
  pointer-events: none;
}

.project-popover-title {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5em;
}

.project-popover-icon {
  display: inline;
  height: 1.5em;
  vertical-align: -25%;
  margin-right: 0.5em;
  background-color: white;
  border-radius: 3px;
  padding: 3px;
}
</style>
