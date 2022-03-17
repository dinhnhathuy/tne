<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 class="app-title">Stay in {{ label }}</h2>
        <NuxtLink v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
          <TemplateHomeRow 
            :home="home"
            class="app-house"  
            @mouseover.native="highLightMarker(home.objectID, true)" 
            @mouseout.native="highLightMarker(home.objectID, false)" 
          ></TemplateHomeRow>
        </NuxtLink>
      </div>
      <div class="app-search-results-map">
        <div ref="googleMap" class="app-map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  async beforeRouteUpdate(to, from, next) {
    const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
    this.homes = data.json.hits
    this.label = to.query.label
    this.lat = to.query.lat
    this.lng = to.query.lng
    this.updateMap()
    next()
  },

  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng
    }
  },

  head() {
    return {
      title: `${this.label} | vbnb`,
    }
  },

  watchQuery: ['lat', 'lng'],

  mounted() {
    this.updateMap()
  },
  
  methods: {
    updateMap() {
      this.$maps.showMap(this.$refs.googleMap, this.lat, this.lng, this.getHomeMarker())
    },
    getHomeMarker() {
      if (this.homes.length === 0) return null
      return this.homes.map(home => {
        return {
          ...home._geoloc,
          pricePerNight: home.pricePerNight,
          id: home.objectID,
        }
      })
    },
    highLightMarker(homeId, isHighlighted) {
      document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
    }
  },

}
</script>

<style>
.marker {
  background: #fff;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}
.marker-highlight {
  color: #fff !important;
  background-color: #000;
  border-color: #000;
}
</style>