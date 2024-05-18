import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const locations = await prisma.location.findMany()
    return locations

})
