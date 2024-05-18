import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { comment, bookId } = body

    Prisma.validator<Prisma.CommentCreateInput>()({
        comment,
        book: bookId,
    })

    let result = await prisma.comment.create({
        data: {
            comment,
            bookId,
            time: new Date(), // Add the 'time' property with the current date and time
            book: { connect: { id: bookId } }, // Add the 'book' property with the bookId connected
        },
    })

    return result
})
