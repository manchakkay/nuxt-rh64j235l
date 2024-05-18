export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const isbn = query.isbn as string

    let thumbnailURL = ''

    if (!isbn) {
        throw new Error('No ISBN provided')
    } else {

        try {
            let openLibraryData: any = await $fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
                method: 'GET'
            })

            if (openLibraryData.cover) {
                thumbnailURL = `https://covers.openlibrary.org/b/id/${openLibraryData.cover[0]}-L.jpg`
            } else {
                // If no thumbnailURL is found, try to get it from Google Books
                if (thumbnailURL === '') {
                    try {
                        let googleBooksData: any = await $fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`, {
                            method: 'GET'
                        })

                        console.log('googleBooks')
                        console.log(googleBooksData)

                        if (googleBooksData.items[0].volumeInfo.imageLinks.thumbnail) {
                            thumbnailURL = googleBooksData.items[0].volumeInfo.imageLinks.thumbnail
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }

                // If no thumbnailURL is found, try get book title from openLibrary API using ISBN, and then get thumbnailURL from Yandex Search
                if (thumbnailURL === '') {
                    try {

                        console.log(openLibraryData)

                        if (openLibraryData.title) {
                            let title = openLibraryData.title
                            let yandexSearchData: any = await $fetch(`https://yandex.com/images/search?text=${title}&img_url=${title}&rpt=imageview`, {
                                method: 'GET'
                            })

                            console.log('yandexSearch')
                            console.log(yandexSearchData)

                            if (yandexSearchData.items[0].pagemap.cse_image[0].src) {
                                thumbnailURL = yandexSearchData.items[0].pagemap.cse_image[0].src
                            }
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }

        // TODO: Add more APIs to get thumbnailURL from ISBNdb, Bookshare, etc.
    }

    return thumbnailURL
})
