<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px;">
      <NuxtLink :to="`/home/${home.objectID}`">{{ home.title }}</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({params ,$dataApi , error}) {
    const response = await $dataApi.getHomes()
    if(!response.ok) return error({ statusCode: response.status, message: response.statusText })
      return {
        homes: response.json.hits
      }
  },
  head() {
    return {
      title: 'HomePage',
      meta:[{
        name: 'description',
        content: 'air-bnb clone for study',
        hid: 'description'
      }]
    }
  },
}
</script>
