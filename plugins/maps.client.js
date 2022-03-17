export default function(context, inject) {
  let isLoaded = false
  // let mapWaiting = null
  let waiting = []

  addScript()
  inject('maps', {
    showMap,
    makeAutoComplete
  })

  function addScript() {
    const script = document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDEAgsh61w9EwnDgkQQVeX62Fd2aV5a9z0&libraries=places&callback=initGoogleMap"
    script.async = true
    window.initGoogleMap = initMap
    document.head.appendChild(script)
  }

  function initMap(){
    isLoaded =  true
    waiting.forEach(item => {
      if(typeof item.fn === 'function'){
        item.fn(...item.arguments)
      }
    })
    waiting = []
  }

  function showMap(canvas, lat, lng, markers){
    // if(isLoaded) renderMap(canvas, lat, lng)
    // else mapWaiting = { canvas, lat, lng }
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      })
      return true
    }
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [{
        featureType: 'poi.bussiness',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      }]
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    if(!markers) {
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({ position })
      marker.setMap(map)
      return true
    }

    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach(home => {
      const position = new window.google.maps.LatLng(home.lat, home.lng)
      const marker = new window.google.maps.Marker({ 
        position, 
        label: {
          text: home.pricePerNight,
          className: `marker home-${home.id}`
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png'
      })
      marker.setMap(map)
      bounds.extend(position)
    })

    map.fitBounds(bounds)
  }

  function makeAutoComplete(input) {
    if(!isLoaded){
      waiting.push({fn: makeAutoComplete, arguments})
      return true
    }
    const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)']})
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
    return autoComplete
  }

//   function renderMap(canvas, lat, lng){
//     const mapOptions = {
//         zoom: 18,
//         center: new window.google.maps.LatLng(lat, lng),
//         disableDefaultUI: true,
//         zoomControl: true,
//     }
//     const map = new window.google.maps.Map(canvas, mapOptions)
//     const position = new window.google.maps.LatLng(lat, lng)
//     const marker = new window.google.maps.Marker({ position })
//     marker.setMap(map)
// }

}