export default function(context, inject) {
    const appKey = 'UI5SR2OEXF'
    const apikey = '6bb9fe7a929107fbd7335e9266c5a06e'
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

    const unWrap = async (response) => {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    const getErrorResponse = (error) => {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
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