<template>
    <section class="library">
        <h1 class="title">Библиотека</h1>
        <input class="search-field" v-model="searchQuery" @input="refreshBooks"
            placeholder="Введите название или автора книги">

        <div class='cards-container'>
            <div class='card' v-for="book in searchResults.books" :key="book.id">
                <img class="card-thumbnail" :src="searchResults.covers[book.id]"
                    onerror="this.src='/images/no-image.svg'">
                <p class='card-title'>{{ book.title }}</p>
                <p class='card-author'>Автор: {{ book.author }}</p>
                <p class='card-location'>Локация: {{ book.location.name }}</p>
                <p class='card-description' v-if="book.description != null">Описание: {{ book.description }}</p>
                <div v-if="book.TagOnBook.length > 0" class="card-tags-container">
                    <span class='card-tag' v-for="tagOnBook in book.TagOnBook" :key="tagOnBook.tagId"> {{
                        tagOnBook.tag.name }}</span>
                </div>
                <div v-if="book.GenreOnBook.length > 0" class="card-genres-container">
                    <span class='card-genre' v-for="genreOnBook in book.GenreOnBook" :key="genreOnBook.genreId"> {{
                        genreOnBook.genre.name }}</span>
                </div>
            </div>
        </div>

        <!-- Pagination based on searchConfig.page and searchConfig.amount -->
        <div class="pagination">
            <button class="prev" @click="searchConfig.page--" :disabled="searchConfig.page == 0">Предыдущая</button>
            <!-- Страница --> {{ searchConfig.page + 1 }} <!-- из --> {{ searchResults.pages }}
            <button class="next" @click="searchConfig.page++"
                :disabled="false/*searchResults.books.length < searchConfig.amount*/">Следующая</button>
        </div>

    </section>
</template>


<script lang="js">
import '~/assets/style/pages/library.scss'
import { getBookCover } from '../utils/bookCover';

useHead({
    title: 'Библиотека',
    meta: [
        { name: 'description', content: 'Поиск по книгам' }
    ],
})

// definePageMeta({ middleware: 'auth' })

export default {
    props: [
        'auth'
    ],
    mounted() {
        this.refreshBooks()
    },
    watch: {
        'searchConfig.page': function (newPage) {
            this.refreshBooks()
        },
        'searchConfig.amount': function (newAmount) {
            this.refreshBooks()
        },
        'searchConfig.sortBy': function (newSortBy) {
            this.refreshBooks()
        },
    },
    data() {
        return {
            searchConfig: {
                page: 0,
                amount: 0,
                sortBy: '',
            },
            searchQuery: '',
            searchResults: [],
        };
    },
    methods: {
        async getCover(isbn) {
            const thumbnailURL = await getBookCover(isbn)
            return thumbnailURL
        },
        async refreshBooks() {
            var searchRequest = {}

            if (this.searchConfig.page != 0)
                searchRequest.page = this.searchConfig.page
            if (this.searchConfig.amount != 0 && this.searchConfig.amount != useAppConfig().searchAmountDefault)
                searchRequest.amount = this.searchConfig.amount
            if (this.searchQuery != '')
                searchRequest.search = this.searchQuery
            else
                if (this.searchConfig.sortBy != '')
                    searchRequest.sortBy = this.searchConfig.sortBy

            try {
                const books = await $fetch('/api/database/books', {
                    method: 'GET',
                    query: searchRequest
                })

                console.log(books)
                this.searchResults = books

                console.log(this.searchResults);
            } catch (error) {
                console.error('Error searching books:', error);
            }
        },
    },
};
</script>