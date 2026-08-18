<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps(['entryId', 'title', 'thumbnail', 'caption'])
const loaded = ref(false)

const thumbnailSrc = computed(() => withBase(props.thumbnail))
// Partner 1921661 / uiconf 54739572 = SAP Video Portal (video.sap.com) embed config
const embedUrl = computed(() =>
  `https://cdnapisec.kaltura.com/p/1921661/embedPlaykitJs/uiconf_id/54739572?iframeembed=true&entry_id=${props.entryId}&autoPlay=true`
)
</script>

<template>
  <figure class="sap-video">
    <div
      class="sap-video__wrapper"
      :class="{ 'sap-video__wrapper--loaded': loaded }"
      @click="!loaded && (loaded = true)"
    >
      <template v-if="!loaded">
        <img :src="thumbnailSrc" :alt="title" />
        <div class="sap-video__overlay">
          <button class="sap-video__play" :aria-label="`Play ${title}`">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div class="sap-video__notice">Click to load &middot; video served by SAP Video Portal</div>
        </div>
      </template>
      <iframe
        v-else
        :src="embedUrl"
        :title="title"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        allow="autoplay *; fullscreen *; encrypted-media *"
      />
    </div>
    <figcaption v-if="caption || title">{{ caption || title }}</figcaption>
  </figure>
</template>

<style scoped>
.sap-video {
  margin: 2rem auto;
  width: 100%;
  text-align: center;
}

.sap-video__wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  cursor: pointer;
  background: #000;
  overflow: hidden;
}

.sap-video__wrapper--loaded {
  cursor: default;
}

.sap-video__wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s;
}

.sap-video__wrapper:not(.sap-video__wrapper--loaded):hover img {
  opacity: 0.8;
}

.sap-video__overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  pointer-events: none;
}

.sap-video__wrapper:not(.sap-video__wrapper--loaded):hover .sap-video__overlay {
  transform: translate(-50%, -50%) scale(1.05);
  transition: transform 0.2s;
}

.sap-video__play {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  border: 2px solid rgba(255, 255, 255, 0.85);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.sap-video__wrapper:not(.sap-video__wrapper--loaded):hover .sap-video__play {
  background: rgba(0, 0, 0, 0.9);
}

.sap-video__play svg {
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 3px;
}

.sap-video__notice {
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  border-radius: 1rem;
  white-space: nowrap;
}

.sap-video__wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

figcaption {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
}
</style>
