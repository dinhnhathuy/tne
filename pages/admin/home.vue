<template>
  <div>[LIST OF HOMES]
    <span v-for="(userHome, index) in homeList" :key="index">{{ userHome }} </span>
    <h2 class="text-xl font-bold">Add a home </h2>
    <form class="form" @submit.prevent="onSubmit()">
      images: <br>
      <TemplateUploadImage @file-uploaded="fileUploaded($event, 0)"></TemplateUploadImage>
      <TemplateUploadImage @file-uploaded="fileUploaded($event, 1)"></TemplateUploadImage>
      <TemplateUploadImage @file-uploaded="fileUploaded($event, 2)"></TemplateUploadImage>
      <TemplateUploadImage @file-uploaded="fileUploaded($event, 3)"></TemplateUploadImage>
      <TemplateUploadImage @file-uploaded="fileUploaded($event, 4)"></TemplateUploadImage>
      Title: <br>
      <input v-model="home.title" type="text" class="w-60"> <br>
      Description: <br>
      <textarea v-model="home.description" class="w-104"></textarea> <br>
      note: <br>
      <textarea v-model="home.note" class="w-104"></textarea> <br>
      features: <br>
      <input v-model="home.features[0]" class="w-26" type="text"> 
      <input v-model="home.features[1]" class="w-26" type="text"> 
      <input v-model="home.features[2]" class="w-26" type="text"> 
      <input v-model="home.features[3]" class="w-26" type="text"> 
      <input v-model="home.features[4]" class="w-26" type="text"> <br>
      price per night: <br>
      <input v-model="home.pricePerNight" type="number" name="w-14"> <br>
      Guests / Romms / Beds / Bath: <br>
      <input v-model="home.guests" type="number" name="w-1/14">
      <input v-model="home.bedrooms" type="number" name="w-1/14">
      <input v-model="home.beds" type="number" name="w-1/14">
      <input v-model="home.bathrooms" type="number" name="w-1/14"> <br>
      <input ref="locationSelector" type="text" autocomplete="off" placeholder="select a location" @changed="changed"> <br>
      Address: <br>
      <input v-model="home.location.address" type="text" class="w-60"> <br>
      city: <br>
      <input v-model="home.location.city" type="text" class="w-60"> <br>
      state: <br>
      <input v-model="home.location.state" type="text" class="w-60"> <br>
      zip: <br>
      <input v-model="home.location.postalCode" type="text" class="w-60"> <br>
      country: <br>
      <input v-model="home.location.country" type="text" class="w-60"> <br>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Home
      </button>
    </form>
  </div>
</template>

<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
  data() {
    return {
      homeList: [],
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          country: '',
          postalCode: ''
        },
        _geoloc: {
          lat: 26.1,
          lng: 26.1
        },
         images: [
        ]
      }
    }
  },
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
    this.fetchHomeList()
  },
  methods: {
    async fetchHomeList() {
      this.homeList = (await unWrap(await fetch('/api/homes/user'))).json
    },
    fileUploaded(fileUrl, index) {
      this.home.images[index] = fileUrl
    },
    changed(event) {
      const addressParts = event.detail.address_components
      const street = this.getAddressParts(addressParts, 'street_number')?.short_name || ''
      const route = this.getAddressParts(addressParts, 'route')?.short_name || ''

      this.home.location.address = street + ' ' + route
      this.home.location.city = this.getAddressParts(addressParts, 'locality')?.short_name || ''
      this.home.location.state = this.getAddressParts(addressParts, 'administrative_area_level_1')?.long_name || ''
      this.home.location.country = this.getAddressParts(addressParts, 'country')?.short_name || ''
      this.home.location.postalCode = this.getAddressParts(addressParts, 'postal_code')?.short_name || ''

      const geo = event.detail.geometry.location
      this.home._geoloc.lat = geo.lat()
      this.home._geoloc.lng = geo.lng()
    },
    getAddressParts(parts, type) {
      return parts.find(part => part.types.includes(type));
    },
    async onSubmit() {
      await fetch('/api/homes', {
        method: 'POST',
        body: JSON.stringify(this.home),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  },
}
</script>

<style lang="postcss" scoped>
.form input,
.form textarea {
  @apply p-1 m-1 bg-gray-200
}

</style>