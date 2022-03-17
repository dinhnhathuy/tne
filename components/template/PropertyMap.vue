<template>
  <div>
    <div class="app-wrapper app-padded-verticel">
      <h2 class="app-subtitle">Location</h2>
      <div class="app-description">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.country }}
      </div>
      <div ref="googleMap" style="height: 800px" class="app-map"></div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true
    }
  },
  mounted() {
      this.$maps.showMap(this.$refs.googleMap, this.home._geoloc.lat, this.home._geoloc.lng)
  },
  methods: {
  },
}
</script>

<style>

</style>