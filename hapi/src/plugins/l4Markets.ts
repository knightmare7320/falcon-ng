import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

const l4MarketsPlugin = {
  name: 'app/l4Markets',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/l4Markets/{regionId}',
        handler: getL4MarketsHandler,
        options: {
          validate: {
            params: Joi.object({
              regionId: Joi.number().integer(),
            }),
            failAction: (request, h, err) => {
              return Boom.badRequest('request requires regionId')
            }
          }
        }
      }
    ])
    
    server.route([
      {
        method: 'GET',
        path: '/l4Market/{l4MarketId}',
        handler: getL4MarketsDetailHandler,
        options: {
          validate: {
            params: Joi.object({
              l4MarketId: Joi.number().integer(),
            }),
            failAction: (request, h, err) => {
              return Boom.badRequest('request requires l4MarketId')
            }
          }
        }
      }
    ])
  }
}
export default l4MarketsPlugin


async function getL4MarketsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const regionId = parseInt(request.params.regionId, 10)

  try {
    const l4Markets = await prisma.l4Market.findMany({
      where: {
        regionId: regionId,
      }
    })
    if (!l4Markets) {
      return h.response().code(404)
    } else {
      return h.response(l4Markets).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get L4 Markets')
  }
}

async function getL4MarketsDetailHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const l4MarketId = parseInt(request.params.l4MarketId, 10)

  try {
    const l4Market = await prisma.l4Market.findUnique({
      where: {
        id: l4MarketId,
      },
      include: {
        region: true,
        l5Markets: true,
      }
    })
    if (!l4Market) {
      return h.response().code(404)
    } else {
      return h.response(l4Market).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get L4 Market')
  }
}