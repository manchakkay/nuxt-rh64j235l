import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const comments = await prisma.comment.findMany()
    return comments
})
