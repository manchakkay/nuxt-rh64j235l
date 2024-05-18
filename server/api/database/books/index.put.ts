import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, title } = body
    const result = await prisma.book.update({
        where: {
            id: id
        },
        data: {
            title: title,
        }
    })

    return result
})
