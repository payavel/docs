
import { defineConfig } from 'vitepress'
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  lang: 'en-US',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon-color-no_background.svg' }]
  ],
  title: "Payavel",
  description: "Service Orchestration & Payment Integration for Laravel",
  themeConfig: {
    logo: {
      light: '/logo-icon_color-text_black-no_background.svg',
      dark: '/logo-icon_color-text_white-no_background.svg',
      alt: 'Payavel'
    },
    siteTitle: false,

    nav: [
      { text: 'Documentation', link: '/guide/ecosystem/what-is-payavel' },
      { text: 'GitHub', link: 'https://github.com/payavel' }
    ],

    search: {
      provider: 'algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX
      }
    },

    sidebar: [
      {
        text: 'Ecosystem',
        items: [
          { text: 'What is Payavel?', link: '/guide/ecosystem/what-is-payavel' },
          { text: 'How it Works', link: '/guide/ecosystem/how-it-works' },
        ]
      },
      {
        text: 'Catalog',
        items: [
          { text: 'Products & Pricing', link: '/guide/catalog/products-and-pricing' },
        ]
      },
      {
        text: 'Checkout',
        items: [
          { text: 'Accepting Payments', link: '/guide/checkout/accepting-payments' },
          { text: 'Getting Started', link: '/guide/checkout/getting-started' },
          { text: 'Routing Payments', link: '/guide/checkout/routing-payments' },
          { text: 'The Contract', link: '/guide/checkout/the-contract' },
        ]
      },
      {
        text: 'Risk',
        items: [
          { text: 'Risk Management', link: '/guide/risk/risk-management' },
        ]
      },
      {
        text: 'Subscription',
        items: [
          { text: 'Recurring Billing', link: '/guide/subscription/recurring-billing' },
        ]
      },
      {
        text: 'Recognition',
        items: [
          { text: 'Revenue Recognition', link: '/guide/recognition/revenue-recognition' },
        ]
      },
      {
        text: 'Orchestration',
        items: [
          { text: 'Installation', link: '/guide/orchestration/installation' },
          { text: 'Configuration', link: '/guide/orchestration/configuration' },
          { text: 'File Structure', link: '/guide/orchestration/file-structure' },
          { text: 'Service Concepts', link: '/guide/orchestration/basic-usage' },
          { text: 'Use Cases', link: '/guide/orchestration/use-cases' },
          { text: 'Drivers', link: '/guide/orchestration/drivers' },
          { text: 'Console Commands', link: '/guide/orchestration/console-commands' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/payavel/orchestration' }
    ]
  },
  sitemap: {
    hostname: 'https://payavel.com'
  }
})
