import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name } = body

    Prisma.validator<Prisma.LocationCreateInput>()({
        name,
    })

    let result = await prisma.location.create({
        data: {
            name,
        },
    })

    return result
})
