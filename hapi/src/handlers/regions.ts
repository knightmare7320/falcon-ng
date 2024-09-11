import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'

export async function getRegionsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app

  try {
    const regions = await prisma.region.findMany()
    return h.response(regions).code(200)
  } catch (err) {
    console.log(err)
    return Boom.badImplementation('Failed to get regions')
  }
}

export async function getRegionHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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


// import { User } from '@prisma/client'

// const result = await prisma.$queryRaw<User[]>`SELECT * FROM User`