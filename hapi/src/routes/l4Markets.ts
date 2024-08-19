import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

import { getL4MarketHandler, getL4MarketsHandler } from '../handlers/l4Markets'

const l4MarketsRoutes = {
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
        handler: getL4MarketHandler,
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

export default l4MarketsRoutes