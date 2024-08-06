import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from, next) => {
  if (to.path === '/') {
    console.log('123')
    return navigateTo('/login')
  }
  // console.log(to)
  // next()
  
})

// import { defineNuxtRouteMiddleware } from '#app'

// export default defineNuxtRouteMiddleware((to) => {
//   // 處理根路徑
//   if (to.path === '/') {
//     console.log('Redirecting from root to login page')
//     return navigateTo('/login')
//   }
// })