import { PrismaClient } from "@prisma/client";
import { getBookCover } from "~/utils/bookCover";

const prisma = new PrismaClient();
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    var page = query.page !== undefined ? Number.parseInt(query.page as string) : 0
    var amount = query.amount !== undefined ? Number.parseInt(query.amount as string) : appConfig.searchAmountDefault
    var searchQuery = "*" + (query.search as string) + "*"

    var result: any = []

    if (query.search !== undefined)
        result = await prisma.book.findMany({
            skip: page * amount,
            take: amount,
            include: {
                location: true,
                TagOnBook: {
                    include: {
                        tag: true,
                    }

                },
                GenreOnBook: {
                    include: {
                        genre: true,
                    }
                }
            },
            where: {
                author: {
                    search: searchQuery,
                },
                title: {
                    search: searchQuery,
                }
            },
            orderBy: {
                _relevance:
                {
                    fields: ['title', 'author'],
                    search: searchQuery,
                    sort: 'desc',
                }
            }
        })
    else
        result = await prisma.book.findMany({
            skip: page * amount,
            take: amount,
            include: {
                location: true,
                TagOnBook: {
                    include: {
                        tag: true,
                    }
                },
                GenreOnBook: {
                    include: {
                        genre: true,
                    }
                },
                BookMeta: {
                    select: {
                        thumbnailURL: true,
                    }
                }
            },
        })

    let covers: any = {}
    // get thumbnailUrls for every book using bookCover.ts
    for (let i = 0; i < result.length; i++) {
        let thumbnailURL = await getBookCover(result[i].ISBN);
        covers[result[i].id] = thumbnailURL;
    }

    console.warn(covers)

    return {
        books: result,
        covers: covers,
    }
})