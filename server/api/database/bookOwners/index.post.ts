import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, phoneNumber, telegram, studentDoc } = body

    Prisma.validator<Prisma.BookOwnerCreateInput>()({
        name,
        phoneNumber,
        telegram,
        studentDoc
    })

    let result = await prisma.bookOwner.create({
        data: {
            name,
            phoneNumber,
            telegram,
            studentDoc
        },
    })

    return result
})
