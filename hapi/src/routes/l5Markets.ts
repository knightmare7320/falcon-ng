import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

import { getL5MarketHandler, getL5MarketsHandler } from '../handlers/l5Markets'

const l5MarketsRoutes = {
  name: 'app/l5Markets',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/l5Markets/{l4MarketId}',
        handler: getL5MarketsHandler,
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
    
    server.route([
      {
        method: 'GET',
        path: '/l5Market/{l5MarketId}',
        handler: getL5MarketHandler,
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

export default l5MarketsRoutes