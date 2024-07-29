import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from, next) => {
  if (to.path === '/') {
    console.log('123')
    return navigateTo('/appointment_home')
  }
  console.log(to)
  // next()
})
