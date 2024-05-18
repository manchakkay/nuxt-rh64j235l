import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const bookOwners = await prisma.bookOwner.findMany()
    return bookOwners
})
