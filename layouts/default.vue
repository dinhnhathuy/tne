<template>
    <div class="app">
        <header class="app-header">
            <NuxtLink to='/' class="app-logo">
                <img src="/images/logo.svg">
            </NuxtLink>
            <div class="app-search">
                <input ref="citySearch" type="text" placeholder="Enter your address" @changed="changed" >
                <input type="text" class="datepicker" placeholder="Check in">
                <input type="text" class="datepicker" placeholder="Check out">
                <button>
                    <img src="/images/icons/search.svg">
                </button>
            </div>
            <div class="app-user-menu">
                <template v-if="isLoggedIn">
                    <img src="/images/icons/house.svg">
                    <NuxtLink to="/admin" class="name">Host</NuxtLink>    
                    <img :src="user.profileUrl" class="avatar">
                </template>
                <div v-show="!isLoggedIn" id="gs2" class="ml-8"></div>
            </div>
        </header>
        <nuxt/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            isLoggedIn: 'auth/isLoggedIn',
            user: 'auth/user'
        })
    },
    mounted() {
        this.$maps.makeAutoComplete(this.$refs.citySearch)
    },
    methods: {
        changed(event) {
            const place = event.detail
            if(!place.geometry) return true
            this.$router.push({
                name: 'search',
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value
                }
            })
        }
    }
}
</script>