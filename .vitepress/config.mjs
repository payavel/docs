
import { defineConfig } from 'vitepress'
import { config } from '../resources/js/config.mjs'
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  ...config,
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
      { text: 'Documentation', link: '/guide/what-is-payavel' },
      { text: 'GitHub', link: 'https://github.com/payavel' }
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
        text: 'Ecosystem',
        items: [
          { text: 'What is Payavel?', link: '/guide/what-is-payavel' },
          { text: 'Architecture & Features', link: '/orchestration/guide/features' },
        ]
      },
      {
        text: 'Catalog',
        items: [
            { text: 'What is Catalog?', link: '/catalog/guide/what-is-catalog' },
        ]
      },
      {
        text: 'Checkout',
        items: [
            { text: 'What is Checkout?', link: '/checkout/guide/what-is-checkout' },
            { text: 'Installation', link: '/checkout/guide/installation' },
            { text: 'Configuration', link: '/checkout/guide/configuration' },
            { text: 'Basic Usage', link: '/checkout/guide/basic-usage' },
        ]
      },
      {
        text: 'Fraud',
        items: [
            { text: 'What is Fraud?', link: '/fraud/guide/what-is-fraud' },
        ]
      },
      {
        text: 'Subscriptions',
        items: [
            { text: 'What are Subscriptions?', link: '/subscriptions/guide/what-are-subscriptions' },
        ]
      },
      {
        text: 'Reporting',
        items: [
            { text: 'What is Reporting?', link: '/reporting/guide/what-is-reporting' },
        ]
      },
      {
        text: 'Core Orchestration',
        items: [
            { text: 'Installation', link: '/orchestration/guide/installation' },
            { text: 'Configuration', link: '/orchestration/guide/configuration' },
            { text: 'File Structure', link: '/orchestration/guide/file-structure' },
            { text: 'Service Concepts', link: '/orchestration/guide/basic-usage' },
            { text: 'Use Cases', link: '/orchestration/guide/use-cases' },
            { text: 'Drivers', link: '/orchestration/guide/drivers' },
            { text: 'Console Commands', link: '/orchestration/guide/console-commands' },
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
