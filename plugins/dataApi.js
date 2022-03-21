import {
  unWrap,
  getErrorResponse
} from "~/utils/fetchUtils"

export default function ({
  $config
}, inject, ) {
  const appKey = $config.algolia.appId
  const apikey = $config.algolia.key
    const headers = {
        'X-Algolia-Application-Id': appKey,
        'X-Algolia-API-Key': apikey
    }

    const getHomes = async () => {
        return unWrap(await fetch(`https://${appKey}-1.algolia.net/1/indexes/homes`, { headers }))
    }

    const getHome = async (homeId) => {
        try {
            return unWrap(await fetch(`https://${appKey}-1.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch (error) {
            getErrorResponse(error)
        }
    }
    const getReviewByHomeId = async (homeId) => {
        try {
            const reviews = await unWrap(await fetch(`https://${appKey}-1.algolia.net/1/indexes/reviews/query`, { 
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
            return reviews
        } catch (error) {
            getErrorResponse(error)
        }
    }

    const getUsebyHomeId = async (homeId) => {
        try {
            const reviews = await unWrap(await fetch(`https://${appKey}-1.algolia.net/1/indexes/users/query`, { 
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                })
            }))
            return reviews
        } catch (error) {
            getErrorResponse(error)
        }
    }

    const getHomesByLocation = async (lat, lng, radiusInMeters= 1500) => {
        try {
            const reviews = await unWrap(await fetch(`https://${appKey}-1.algolia.net/1/indexes/homes/query`, { 
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    attributesToHighlight: [],
                })
            }))
            return reviews
        } catch (error) {
            getErrorResponse(error)
        }
    }

    inject('dataApi', { getHome, getHomes, getReviewByHomeId, getUsebyHomeId, getHomesByLocation })
} 