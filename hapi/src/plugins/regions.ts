import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

const regionsPlugin = {
  name: 'app/regions',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/regions',
        handler: getRegionsHandler, 
      }
    ])

    server.route([
      {
        method: 'GET',
        path: '/region/{regionId}',
        handler: getRegionsDetailHandler,   
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
  }
}
export default regionsPlugin


async function getRegionsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  try {
    const regions = await prisma.region.findMany()
    return h.response(regions).code(200)
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get regions')
  }
}

async function getRegionsDetailHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const regionId = parseInt(request.params.regionId, 10)

  try {
    const region = await prisma.region.findUnique({
      where: {
        id: regionId,
      },
      include: {
        l4Markets: true,
      },
    })
    if (!region) {
      return h.response().code(404)
    } else {
      return h.response(region).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get region')
  }
}