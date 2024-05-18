// Конфигурация для Nuxt.js
export default defineNuxtConfig({
  // Модули
  // Сторонние модули
  modules: ['@sidebase/nuxt-auth'],

  // Конфигурация приложения
  app: {
      head: {
          link: [
              {
                  rel: 'stylesheet',
                  href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' // Внешний стилевой файл
              }
          ]
      }
  },

  // Конфигурация аутентификации
  auth: {
      isEnabled: process.env.AUTH_ENABLED ?? true, // Включить аутентификацию
      baseURL: process.env.AUTH_ORIGIN, // Базовый URL для аутентификации
      provider: {
          type: 'authjs' // Тип провайдера аутентификации
      }
  },

  // Конфигурация сервера разработки
  devServer: {
      port: 8000 // Порт для сервера разработки
  },

  // Конфигурация сервера
  server: {
      port: 8080 // Порт для сервера продакшена
  },

  // Отключить серверный рендеринг
  ssr: false,

  // Конфигурация времени выполнения
  runtimeConfig: {
      GoogleOAuth: {
          clientID: process.env.GOOGLE_OAUTH_CLIENT_ID, // Идентификатор клиента Google OAuth
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET // Секрет клиента Google OAuth
      }
  },

  // Конфигурация CSS
  css: [
      '~/assets/style/global.scss' // Глобальный CSS-файл
  ],

  // Конфигурация Vite
  vite: {
      optimizeDeps: {
          include: [
              "@unhead/vue",
              "vue-multiselect",
          ]
      },
  },

  devtools: {
    enabled: true,
  },
})
