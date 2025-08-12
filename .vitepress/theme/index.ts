// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Figure from '../components/Figure.vue'
import Term from '../components/Term.vue'
import Project from '../components/Project.vue'
import Journey from '../components/Journey.vue'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'
import VPFooter from '../components/VPFooter.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(VPFooter)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('ApeiroFigure', Figure)
    app.component('Term', Term)
    app.component('Project', Project)
    app.component('Journey', Journey)
    app.component('BlogList', BlogList)
    app.component('BlogPost', BlogPost)
  }
} satisfies Theme
