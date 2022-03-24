import { v4 as uuidv4 } from "uuid"
import { rejectHitBadRequest, hasBadBody, sendJSON } from "../../helpers"

export default (apis) => {
  return async (req, res) => {
    if (req.method === 'GET' && req.url === '/user') {
      return await getHomeByUser(req.identity.id, res)
    }

    if (req.method === "POST") {
      if (hasBadBody(req)) {
        rejectHitBadRequest(res)
      }
      await createHome(req.identity, req.body, res)
      return
    }
    return rejectHitBadRequest(res)
  }

  async function createHome(identity, body, res) {
    const homeId = uuidv4()
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    }
    const resp = await apis.homes.create(homeId, payload)
    if (!resp.ok) {
      res.statusCode = 500
      return res.send()
    }
    await apis.user.assignHome(identity, homeId)
    sendJSON({}, res)
  }

  async function getHomeByUser(userId, res) {
    const payload = (await apis.homes.getByUserId(userId)).json.hits
    sendJSON(payload, res)
  }
}
