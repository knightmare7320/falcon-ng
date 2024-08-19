import Hapi from '@hapi/hapi'

import statusRoutes from './routes/status'
import prismaPlugin from './handlers/prisma'
import regionsRoutes from './routes/regions'
import l4MarketsRoutes from './routes/l4Markets'
import l5MarketsRoutes from './routes/l5Markets'
import orgClustersRoutes from './routes/orgClusters'

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'localhost',
})

export async function createServer(): Promise<Hapi.Server> {
  await server.register([
    prismaPlugin,
    statusRoutes,
    regionsRoutes,
    l4MarketsRoutes,
    l5MarketsRoutes,
    orgClustersRoutes,
  ])
  await server.initialize()

  return server
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
  return server
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})