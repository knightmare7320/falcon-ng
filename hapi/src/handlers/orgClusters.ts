import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import { Prisma } from '@prisma/client'

export async function getOrgClustersHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const l5MarketId = parseInt(request.params.l5MarketId, 10)

  try {
    const orgClusters = await prisma.orgCluster.findMany({
      where: {
        l5MarketId: l5MarketId,
      }
    })
    if (!orgClusters) {
      return h.response().code(404)
    } else {
      return h.response(orgClusters).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get Org Clusters')
  }
}

export async function getOrgClusterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const orgClusterId = parseInt(request.params.orgClusterId, 10)
  const orderBy = request.query.orderBy;
  const orderDir = request.query.orderDir;
  const pageNumber = parseInt(request.query.pageNumber, 10)
  const pageSize = parseInt(request.query.pageSize, 10)
  const offset = (pageNumber-1) * pageSize

  try {
    const orgCluster = await prisma.orgCluster.findUnique({
      where: {
        id: orgClusterId,
      },
      include: {
        L5Market: {select: {name: true}},
        sites: {
          select: {
            id: true, 
            cascadeCode: true,
          },
          // TODO: fix the orderBy
          orderBy:{cascadeCode: orderDir},
          skip: offset,
          take: pageSize,
        },
      },
    })
    if (!orgCluster) {
      return h.response().code(404)
    } else {
      return h.response(orgCluster).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get Org Cluster')
  }
}






export async function getOrgClustersHandler2(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const orgClusterId = parseInt(request.params.orgClusterId, 10)
  const filterStr = request.query.filterStr
  const orderBy = request.query.orderBy
  const orderDir = request.query.orderDir
  const pageNumber = parseInt(request.query.pageNumber, 10)
  const pageSize = parseInt(request.query.pageSize, 10)

  console.log('hi')
  try {
    const orgCluster = await prisma.$queryRaw(Prisma.sql`call FalconCode.getOrgClusterSitesPerf(
        ${orgClusterId},
        ${filterStr},
        ${orderBy},
        ${orderDir},
        ${pageNumber},
        ${pageSize}
      )`
    )
    console.log(orgCluster)
    if (!orgCluster) {
      return h.response().code(404)
    } else {
      return h.response(orgCluster).code(200)
    }
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get Org Cluster')
  }
}