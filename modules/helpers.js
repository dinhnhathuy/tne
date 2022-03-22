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