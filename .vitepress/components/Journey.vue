<script setup>
defineProps(['steps'])
</script>

<template>
  <div class="apeiro-journey-wrapper shadow--lw">
    <div class="apeiro-journey-map-container">
      <div class="apeiro-journey-line"></div>
      <div v-for="(data, index) in steps" class="apeiro-journey-stop-container">
        <div :class="`apeiro-journey-stop ${(data.main ? 'apeiro-journey-stop-main' : '')}`">
          {{ data.step }}
        </div>
        <div class="apeiro-journey-stop-name">
          <a :href="data.url">{{ data.name }}</a>
          <br/>
          <div v-if="data.text" class="apeiro-journey-stop-sub">
            <span>
              {{ data.text }}
              <br/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apeiro-journey-wrapper {
  padding: 2rem;
  background: rgba(var(--apeiro-contrast), 0.05);
  width: 100%;
  margin: 3rem 0;
}

.apeiro-journey-map-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}

.apeiro-journey-stop-container {
  display: flex;
  align-items: flex-start;
}

.apeiro-journey-stop {
  min-width: 2.5rem;
  min-height: 2.5rem;
  color: #333;
  background-color: #fff;
  border: 0.4rem solid var(--ifm-color-primary);
  border-radius: 50%;
  margin: 0rem 1rem;
  text-align: center;
  font-weight: bold;
  z-index: 1;
}

.apeiro-journey-stop-main {
  background-color: #ffd8d8;
}

.apeiro-journey-stop-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--ifm-font-color-base);
  margin-top: 0.2rem;
  margin-bottom: 2rem;
  line-height: normal;
}

.apeiro-journey-stop-name > a {
  font-weight: 700;
  text-decoration: none;
}
.apeiro-journey-stop-name > a:hover {
  text-decoration: underline;
}

.apeiro-journey-stop-sub {
  font-size: 1rem;
  font-weight: normal;
  color: var(--ifm-font-color-base);
  text-decoration-color: var(--ifm-color-primary-lighter);
}

.apeiro-journey-line {
  position: absolute;
  top: 2.05rem;
  left: 2.05rem;
  width: 0.4rem;
  bottom: 2.05rem;
  background-color: var(--ifm-color-primary);
  z-index: 0;
}
</style>