// note: this config works both locally and with github.com
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Apeiro Reference Architecture - Documentation',
  tagline: 'Apeiro-Reference-Architecture is created open!',
  favicon: 'img/favicon-32x32.png',

  // Set the production url of your site here
  url: 'https://documentation.apeirora.eu',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: 'apeirora',
  projectName: 'apeirora.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apeirora/apeirora.github.io/edit/main',
          disableVersioning: false,
          includeCurrentVersion: true,
          versions: {
            current: {
              label: 'Next Release (WIP)',
              banner: 'unreleased',
              badge: true,
              noIndex: true
            },
            '2025-03': {
              label: 'Release March 2025',
              banner: 'none',
              badge: false,
              noIndex: false
            },
          },
        },
        pages: false,
        blog: {
          routeBasePath: 'blog',
          path: 'blog'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
    metadata: [
      {name: 'keywords', content: 'ApeiroRA, Apeiro, Apeiro Reference Architecture, SAP, IPCEI-CIS'},
    ],
    navbar: {
      title: 'Apeiro Reference Architecture',
      logo: {
        alt: 'Apeiro Reference Architecture Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {to: '/', label: 'Docs', position: 'left', className: 'apeiro-navbar-link'},
        {to: 'blog', label: 'Blog', position: 'left', className: 'apeiro-navbar-link'}
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.<br><small><a href="https://www.sap.com/corporate/en/legal/impressum.html">Legal Disclosure</a></small>`,
    },
    colorMode: {
      disableSwitch: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: 'base', dark: 'base' },
      options: {
          themeVariables: {
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, \'Segoe UI\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
            background: '#FFFFFF',
            primaryColor: '#146DDF',
            primaryTextColor: '#FFFFFF',
            secondaryColor: '#1F84DA',
            secondaryTextColor: '#FFFFFF',
            tertiaryColor: '#2A9AD4',
            tertiaryTextColor: '#FFFFFF',
            lineColor: '#0a59e4',
            cScale1: '#146DDF',
            cScale2: '#1F84DA',
            cScale3: '#2A9AD4',
            cScale4: '#35B1CF',
            cScale5: '#87BEE1'
          },
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [ require.resolve('docusaurus-lunr-search'), {
      languages: ['en']
    }]
  ],
};

export default config;
