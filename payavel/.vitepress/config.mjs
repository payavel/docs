import { defineConfig } from 'vitepress'
import { config } from '../../resources/js/config.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...config,
  title: "Payavel",
  description: "Checkout for Laravel",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
        light: '/logo-icon_color-text_black-no_background.svg',
        dark: '/logo-icon_color-text_white-no_background.svg',
        alt: 'Payavel'
    },
    siteTitle: false,

    nav: [
      { text: 'Guide', link: '/guide/what-is-payavel' },
      { text: 'API Reference', link: '/api' }
    ],

    sidebar: {
        '/guide': [
            {
                text: 'Introduction',
                items: [
                { text: 'What is payavel?', link: '/guide/what-is-payavel' },
                { text: 'Packages', link: '/guide/packages' }
                ]
            }
        ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/payavel' }
    ]
  }
})
