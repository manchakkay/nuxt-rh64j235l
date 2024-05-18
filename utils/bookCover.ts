const providersConfig = useAppConfig().bookCoverProviders;

export const getBookCover = async (isbn: string) => {

    let thumbnailURL = '';

    if (!isbn) {
        return thumbnailURL;
    }


    let openLibraryData;
    try {
        openLibraryData = await fetchOpenLibraryData(isbn);
    } catch (error) { }

    try {
        if (providersConfig.openLibrary && openLibraryData.covers) {
            if (openLibraryData.covers.length > 0) {
                const coverId = openLibraryData.covers[0];
                const coverURL = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
                const response = await fetch(coverURL);
                if (response.ok) {
                    thumbnailURL = coverURL;
                }
                console.log('OL Cover:' + coverURL)
            }
        }
    } catch (error) { }

    try {
        if (providersConfig.googleBooks && thumbnailURL == '') {
            const googleBookCoverURL = await fetchGoogleBookCover(isbn, openLibraryData.title);
            console.log('GB Cover:' + googleBookCoverURL)

            thumbnailURL = googleBookCoverURL;

            // Add throttling to comply with Google Books API rate limits
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 0.2 second
        }
    } catch (error) { }

    try {
        if (thumbnailURL == '') {
            const checkCoverAvailability = async (isbn: string) => {
                const abeBookCoverURL = `https://pictures.abebooks.com/isbn/${isbn}.jpg`;
                const response = await fetch(abeBookCoverURL);
                if (response.ok) {
                    return abeBookCoverURL;
                }
                return '';
            };

            if (thumbnailURL == '') {
                thumbnailURL = await checkCoverAvailability(isbn);
            }
        }
    } catch (error) { }


    return thumbnailURL;
};

const fetchOpenLibraryData = async (isbn: string) => {
    try {
        const openLibraryData = await $fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return openLibraryData;
    } catch (error) {
        handleError(error);
    }
}

const fetchGoogleBookCover = async (isbn: string, title?: string) => {
    try {
        const googleBooksData = await $fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`, {
            method: 'GET',
        });

        if (googleBooksData.items[0]?.volumeInfo?.imageLinks?.thumbnail) {
            return googleBooksData.items[0].volumeInfo.imageLinks.thumbnail;
        }
    } catch (error) {
        handleError(error);
    }
    return '';
}



const handleError = (error: Error) => {
    if (error.message.includes('openlibrary')) {
        console.info('%c' + error, 'background-color: yellow');
    } else if (error.message.includes('googleapis')) {
        console.info('%c' + error, 'background-color: blue');
    } else if (error.message.includes('yandex')) {
        console.info('%c' + error, 'background-color: orange');
    } else {
        console.info(error);
    }
};
