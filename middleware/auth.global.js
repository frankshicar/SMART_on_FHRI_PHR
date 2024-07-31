// import { defineEventHandler } from "h3"; 
// import { parseCookies } from 'h3'


// export default defineEventHandler(async (event) => {
//   const cookies = parseCookies(event);
//   const token = cookies.cookies

//   if(!token && to.path !== '/login'){
//     return navigateTo('/login')
//   }
// });

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    nextTick(() => {
      const token = useCookie('token', {
        default: () => null,
      })

      if (!token.value && to.path !== '/login') {
        console.log("Token: ", token.value)
        console.log('Dont have token')
        navigateTo('/login')
      } else {
        console.log("Have token:", token.value)
      }
    })
  }
})