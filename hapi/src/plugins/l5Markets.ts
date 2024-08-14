import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

const l5MarketsPlugin = {
  name: 'app/l5Markets',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/l5Markets/{l4marketId}',
        handler: getL5MarketsHandler,
        options: {
          validate: {
            params: Joi.object({
              regionId: Joi.number().integer(),
            }),
            failAction: (request, h, err) => {
              return Boom.badRequest('request requires l4MarketId')
            }
          }
        }
      }
    ])
    
    server.route([
      {
        method: 'GET',
        path: '/l5Market/{l5MarketId}',
        handler: getL5MarketsDetailHandler,
        options: {
          validate: {
            params: Joi.object({
              l5MarketId: Joi.number().integer(),
            }),
            failAction: (request, h, err) => {
              return Boom.badRequest('request requires l5MarketId')
            }
          }
        }
      }
    ])
  }
}
export default l5MarketsPlugin


async function getL5MarketsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

async function getL5MarketsDetailHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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