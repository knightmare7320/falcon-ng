import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'

export async function getL5MarketsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const l4MarketId = parseInt(request.params.l4MarketId, 10)

  try {
    const l5Markets = await prisma.l5Market.findMany({
      where: {
        l4MarketId: l4MarketId,
      }
    })
    if (!l5Markets) {
      return h.response().code(404)
    } else {
      return h.response(l5Markets).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get L5 Markets')
  }
}

export async function getL5MarketHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const l5MarketId = parseInt(request.params.l5MarketId, 10)

  try {
    const l5Market = await prisma.l5Market.findUnique({
      where: {
        id: l5MarketId,
      },
      include: {
        l4Market: true,
        orgClusters: true,
      }
    })
    if (!l5Market) {
      return h.response().code(404)
    } else {
      return h.response(l5Market).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get L5 Market')
  }
}