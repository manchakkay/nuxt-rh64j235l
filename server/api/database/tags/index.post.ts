import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name } = body

    Prisma.validator<Prisma.TagCreateInput>()({
        name,
    })

    let result = await prisma.tag.create({
        data: {
            name,
        },
    })

    return result
})
