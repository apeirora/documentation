<script setup lang="ts">
import { useSidebar } from 'vitepress/theme'
const { hasSidebar } = useSidebar()
</script>

<template>
  <footer class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <div class="funding-notice">
        <div class="funding-image">
          <div class="funding-image-container">
            <div class="funding-image-bg"></div>
            <img src="/img/BMWE-EU.png" alt="Funded by the European Union, NextGenerationEU; Supported by Federal Ministry of Economic Affairs and Energy on the basis of a decision by the German Bundestag" class="funding-image-src">
          </div>
        </div>
        <div class="funding-text">
          <p>
            <strong>Funded by the European Union – NextGenerationEU.</strong>
          </p>
          <p>
            The views and opinions expressed are solely those of the author(s) and do not necessarily reflect the views of the European Union or the European Commission. Neither the European Union nor the European Commission can be held responsible for them.
          </p>
          <div class="copyright">
            <p>
              <strong>
                © 2025 SAP SE or an SAP affiliate company. All rights reserved.
              </strong>
            </p>
          </div>
        </div>

      </div>

      <div class="affiliations">
        <a href="https://www.sap.com/" target="_blank" rel="noreferrer noopener">
          <img src="/img/logo_partner_sap.svg" alt="Logo of SAP SE" title="Logo of SAP SE" />
        </a>
        <a href="https://apeirora.eu/" target="_blank" rel="noreferrer noopener">
          <img src="/img/logo.svg" alt="Logo of the Apeiro Reference Architecture" title="Logo of the Apeiro Reference Architecture" />
        </a>
        <a href="https://neonephos.org/" target="_blank" rel="noreferrer noopener">
          <img src="/img/neonephos_color.svg" alt="Logo of the NeoNephos foundation" title="Logo of the NeoNephos foundation" />
        </a>
      </div>

      <div class="footer-legal-links">
        <a href="https://www.sap.com/corporate/en/legal/impressum.html">Legal Disclosure</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.VPFooter.has-sidebar {
  display: none;
}

.VPFooter :deep(a) {
  text-decoration-line: underline;
  text-underline-offset: 2px;
  transition: color 0.25s;
}

.VPFooter :deep(a:hover) {
  color: var(--vp-c-text-1);
}

@media (min-width: 768px) {
  .VPFooter {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.VPFooter.has-sidebar {
  display: block;
}

@media (min-width: 960px) {
  .VPFooter.has-sidebar {
    margin-left: 304px; /*272 + 32*/
    margin-right: 32px;
  }
}

@media (min-width: 1280px) {
  .VPFooter.has-sidebar {
    width: 770px;
    margin: 0 auto;
  }
}

/* Main Footer Container */
.footer {
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  padding: 32px 24px;
  margin-top: 64px;
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

/* Funding Notice Section */
.funding-notice {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 0 0 24px 0;
}

.funding-image img {
  max-width: 300px;
  height: auto;
  display: block;
}

.funding-text {
  flex: 1;
  min-width: 280px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  text-align: left;
}

.funding-text p {
  margin: 0;
}

/* Final Copyright Line */
.copyright {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  text-align: left;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-top: 24px;
  line-height: 1.6;
}

.footer-legal-links {
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.footer-legal-links a {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  margin: 0 4px;
  transition: color 0.2s;
}

.footer-legal-links a:hover {
  color: var(--vp-c-brand-1);
}

.footer-legal-sep {
  margin: 0 4px;
  color: var(--vp-c-divider);
}

.affiliations {
  align-items: center;
  column-gap: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.affiliations img {
  display: inline;
  height: 2rem;
}
</style>