import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const authors = await prisma.book.findMany(
        {
            select: {
                author: true
            },
            distinct: ['author'],
        }
    )
    return authors
})
