<template>
  <div v-if="home" class="app-container">
    <TemplatePropertyGalery :images="home.images" />
    <TemplatePropertyDetail :home="home" />
    <TemplatePropertyDescription :home="home" />
    <TemplatePropertyMap :home="home" />
    <TemplatePropertyReviews :reviews="reviews" />
    <TemplatePropertyHost :user="user"></TemplatePropertyHost>
  </div>
</template>

<script>
  export default {
    // regular way to declare props
    // async asyncData({ params, $dataApi, error}) {

    //   const response = await $dataApi.getHome(params.id)
    //   if(!response.ok) return error({ statusCode: response.status, message: response.statusText })

    //   const reviewsRes = await $dataApi.getReviewByHomeId(params.id)
    //   if(!reviewsRes.ok) return error({ statusCode: response.status, message: response.statusText })

    //   const usersRes = await $dataApi.getUsebyHomeId(params.id)
    //   if(!usersRes.ok) return error({ statusCode: response.status, message: response.statusText })

    //   return {
    //     home: response.json,
    //     reviews: reviewsRes.json.hits,
    //     user: usersRes.json.hits[0]
    //   }
    // },
    async asyncData({ params, $dataApi, error}) {
      const responses = await Promise.all([
        $dataApi.getHome(params.id),
        $dataApi.getReviewByHomeId(params.id),
        $dataApi.getUsebyHomeId(params.id)
      ])

      const badResponse = responses.find(res => !res.ok)
      if (badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText })
     
      return {
        home: responses[0].json,
        reviews: responses[1].json.hits,
        user: responses[2].json.hits[0]
      }
    },
    head() {
      return {
        title: this.home.title,
      }
    },
  }

</script>
