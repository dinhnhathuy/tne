export default {
  target: 'static',
  head: {
    title: 'air-bnb',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [{
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },

  router: {
    prefetchLinks: false
  },

  css: ['~/assets/sass/app.scss'],

  plugins: [
    '~/plugins/dataApi.js',
    '~/plugins/maps.client.js',
    '~/plugins/auth.client.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/cloudinary',
    '~/modules/auth.js',
    '~/modules/algolia',
    '~/modules/cloudinary',
  ],

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  },

  axios: {
    baseURL: '/',
  },

  content: {},

  build: {
    extractCSS: true,
  },
  publicRuntimeConfig: {
      auth: {
        cookieName: 'idToken',
        clientId: process.env.GOOGLE_CLIENT_ID,
      },
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        key: process.env.ALGOLIA_API_KEY
      },
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      }
    },
    privateRuntimeConfig: {
        algolia: {
          appId: process.env.ALGOLIA_APP_ID,
          key: process.env.ALGOLIA_ADMIN_API_KEY
        },
        cloudinary: {
          apiSecret: process.env.CLOUDINARY_API_SECRET,
        }
      },
    serverMiddleware: [],
}
