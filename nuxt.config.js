export default {
  ssr: true,
  target: 'server',
  head: {
    title: '預約取藥首頁',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
  },
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  build: {},
  router: {
    middleware: 'redirect',
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/api/MedicationRequest.js' } // 這裡配置了 /api 路徑對應到 Express 伺服器
  ]
}
