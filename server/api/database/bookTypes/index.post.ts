import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name } = body

    Prisma.validator<Prisma.BookTypeCreateInput>()({
        name,
    })

    let result = await prisma.bookType.create({
        data: {
            name,
        },
    });

    return result
});
