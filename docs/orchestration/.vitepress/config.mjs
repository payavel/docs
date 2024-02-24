import { defineConfig } from 'vitepress'
import { config } from '../../../.vitepress/config.mjs'

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
      alt: 'Payavel'
    },

    nav: [
      { text: 'Guide', link: '/guide/what-is-orchestration' }
    ],

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
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/payavel/orchestration' }
    ]
  }
})
