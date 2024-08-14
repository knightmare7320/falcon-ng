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
