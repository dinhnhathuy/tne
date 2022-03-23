export const getHeaders = (algoliaConfig) => {
  return {
    'X-Algolia-Application-Id': algoliaConfig.appId,
    'X-Algolia-API-Key': algoliaConfig.key,
  }
}

export const sendJSON = (data, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}
export const rejectHitBadRequest = (res) => {
  res.statusCode = 400
  res.end()
}
export const hasBadBody = (req) => {
  return !req.body || Object.keys(req.body).length === 0
}