import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const bookTypes = await prisma.bookType.findMany()
    return bookTypes
})
