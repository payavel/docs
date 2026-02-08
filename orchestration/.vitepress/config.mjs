import { defineConfig } from 'vitepress'
import { config, ecosystemNav } from '../../resources/js/config.mjs'
import dotenv from 'dotenv';
dotenv.config();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...config,
  title: "orchestration",
  description: "Service provider orchestration for Laravel",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo-icon_color-text_black-no_background.svg',
      dark: '/logo-icon_color-text_white-no_background.svg',
      alt: 'Payavel Orchestration'
    },
    siteTitle: false,

    nav: [
      { text: 'Guide', link: '/guide/what-is-orchestration' },
      { text: 'Ecosystem', items: ecosystemNav }
    ],

    search: {
      provider: 'algolia',
      options: {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: process.env.ALGOLIA_ORCHESTRATION_INDEX
      }
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is orchestration?', link: '/guide/what-is-orchestration' },
          { text: 'Features', link: '/guide/features' },
        ]
      },
      {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'File Structure', link: '/guide/file-structure' },
            { text: 'Basic Usage', link: '/guide/basic-usage' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/payavel/orchestration' }
    ]
  },
  sitemap: {
    hostname: 'https://orchestration.payavel.com'
  }
})
