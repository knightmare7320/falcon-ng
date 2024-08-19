import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

import { getRegionHandler, getRegionsHandler } from '../handlers/regions'

const regionsRoutes = {
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
        handler: getRegionHandler,   
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

export default regionsRoutes