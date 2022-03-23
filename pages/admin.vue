<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold"> Admin</h1>
    <nuxt-child />
    <div class="bg-gray-200 p-2">
      <nuxt-link to="/admin/home">Homes</nuxt-link>
    </div>

  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  asyncData({ $config, redirect }) {
    if(!Cookie.get($config.auth.cookieName)) {
      redirect('/no-access/')
      return true
    }
  },
}
</script>

<style>

</style>