
import { defineConfig } from 'vitepress'
import { config, ecosystemNav } from '../../resources/js/config.mjs'
import dotenv from 'dotenv';
dotenv.config();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...config,
  title: "checkout",
  description: "Payment integration made easy for Laravel",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo-icon_color-text_black-no_background.svg',
      dark: '/logo-icon_color-text_white-no_background.svg',
      alt: 'Payavel Checkout'
    },
    siteTitle: false,

    nav: [
      { text: 'Guide', link: '/guide/what-is-checkout' },
      { text: 'Ecosystem', items: ecosystemNav }
    ],

    search: {
      provider: 'algolia',
      options: {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: process.env.ALGOLIA_CHECKOUT_INDEX
      }
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is checkout?', link: '/guide/what-is-checkout' },
        ]
      },
      {
        text: 'Getting Started',
        items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Basic Usage', link: '/guide/basic-usage' },
            { text: 'Drivers', link: '/guide/drivers' },
            { text: 'Console Commands', link: '/guide/console-commands' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/payavel/checkout' }
    ]
  },
  sitemap: {
    hostname: 'https://checkout.payavel.com'
  }
})
