import { useCookie, defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.client) {
    const token = useCookie('token').value

    if (!token && to.path !== '/login') {
      console.log("Token: ", token)
      console.log('Dont have token')
      return navigateTo('/login')
    } else {
      console.log("Have token:", token)
    }
  }
})

// import { useCookie, defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

// export default defineNuxtRouteMiddleware((to) => {
//   if (process.client) {
//     nextTick(() => {
//       const token = useCookie('token', {
//         default: () => null,
//       })

//       if (!token.value && to.path !== '/login') {
//         console.log("Token: ", token.value)
//         console.log('Dont have token')
//         return navigateTo('/login')
//       } else {
//         console.log("Have token:", token.value)
//       }
//     })
//   }
// })



// import { defineNuxtRouteMiddleware } from '#app'
// import { useCookie } from 'nuxt/app'

// export default defineNuxtRouteMiddleware((to, from) => {
//   const token = useCookie('token')

//   if (!token.value && to.path !== '/login') {
//     console.log("Don't have token")
//     return navigateTo('/login')
//   } else {
//     console.log("Have token:", token.value)
//   }
// })