import { PrismaClient, Prisma } from '@prisma/client'
import { getBookCover } from '~/utils/bookCover'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { author, title, description, ISBN, type, locationId } = body

    Prisma.validator<Prisma.BookCreateInput>()({
        author,
        title,
        description,
        ISBN,
        type,
        location: locationId,
    })

    // Create a book record
    let result = await prisma.book.create({
        data: {
            author,
            title,
            description,
            ISBN,
            type,
            location: { connect: { id: locationId } },
        },
    })

    // GET thumbnailURL from server/api/support/bookCover.get.ts
    if (ISBN) {
        let thumbnailURL = await getBookCover(ISBN)

        // Create a bookMeta record if a thumbnailURL is found
        if (thumbnailURL !== '') {
            await prisma.bookMeta.create({
                data: {
                    bookId: result.id,
                    thumbnailURL: thumbnailURL ? thumbnailURL : null,
                },
            })
        }

    }

    return result

})