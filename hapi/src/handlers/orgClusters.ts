import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'

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

  console.log(request.query)

  try {
    const orgCluster = await prisma.orgCluster.findUnique({
      where: {
        id: orgClusterId,
      },
      include: {
        L5Market: true,
        sites: true,
      }
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