import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Joi from 'joi'

import { getOrgClusterHandler, getOrgClustersHandler } from '../handlers/orgClusters'

const pagingSchema = Joi.object({
  orderBy: Joi.string().default('name'),
  orderDir: Joi.string().lowercase().valid('asc','desc').default('asc'),
  pageSize: Joi.number().integer().min(1).default(10),
  pageNumber: Joi.number().integer().min(1).default(1),
  filterString: Joi.string().default(null),
});

const orgClustersRoutes = {
  name: 'app/orgClusters',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/orgClusters/{l5MarketId}',
        handler: getOrgClustersHandler,
        options: {
          validate: {
            params: Joi.object({
              l5MarketId: Joi.number().integer(),
            }),
            query: pagingSchema,
            failAction: (request, h, err) => {
              return Boom.badRequest('Invalid options - /orgClusters/{l5MarketId}?orderBy={}&orderDir={}&pageSize={}&pageNumber={}&filterString={}')
            }
          }
        }
      }
    ])
    
    server.route([
      {
        method: 'GET',
        path: '/orgCluster/{orgClusterId}',
        handler: getOrgClusterHandler,
        options: {
          validate: {
            params: Joi.object({
              orgClusterId: Joi.number().integer(),
            }),
            query: pagingSchema,
            failAction: (request, h, err) => {
              return Boom.badRequest('Invalid options - /orgClusters/{l5MarketId}?orderBy={string}&orderDir={asc|desc}&pageSize={integer}&pageNumber={integer}&filterString={string}')
            }
          }
        }
      }
    ])
  }
}

export default orgClustersRoutes