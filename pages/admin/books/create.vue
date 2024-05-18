<template>
    <div class="create-book">
        <form @submit.prevent="submitForm">
            <div class="field-wrapper">
                <label for="author" class="field-label">Автор</label>
                <input
                    class="field"
                    id="author"
                    v-model="book.author"
                    type="text"
                    list="authors"
                    placeholder="Автор"
                    required
                    autocomplete="off"
                />
                <datalist id="authors">
                    <option v-for="author in sortedAuthors" :value="author.author">{{ author.author }}</option>
                </datalist>
            </div>
            <div class="field-wrapper">
                <label for="title" class="field-label">Название</label>
                <input class="field" id="title" v-model="book.title" placeholder="Название" required autocomplete="off"/>
            </div>
            <div class="field-wrapper">
                <label for="description" class="field-label">Описание</label>
                <textarea class="field" id="description" v-model="book.description" placeholder="Описание" resize="none" rows="6" autocomplete="off"/>
            </div>
            <div class="field-wrapper">
                <label for="ISBN" class="field-label">ISBN</label>
                <input class="field" id="ISBN" v-model="book.ISBN" placeholder="ISBN" autocomplete="off"/>
            </div>
            <div class="field-wrapper">
                <label for="type" class="field-label">Тип</label>
                <select class="field" id="type" v-model="book.typeId" autocomplete="off">
                    <option v-for='bookType in bookTypes' :value="bookType.id" :key="bookType.id">{{ bookType.name }}
                    </option>
                </select>
            </div>
            <div class="field-wrapper">
                <label for="location" class="field-label">Локация</label>
                <select class="field" id="location" v-model="book.locationId" autocomplete="off">
                    <option v-for="location in locations" :value="location.id" :key="location.id">{{ location.name }}
                    </option>
                </select>
            </div>
            <div class="field-wrapper">
                <label for="genres" class="field-label">Жанр</label>
                <multiselect v-model="book.genreIds" :options="genres" :multiple="true" class="field" placeholder="Выберите жанр" />
            </div>
            <div class="field-wrapper">
                <label for="tags" class="field-label">Теги</label>
                <multiselect v-model="book.tagIds" :options="tags" :multiple="true" class="field" placeholder="Выберите теги" />
            </div>
            
            <button type="submit" class="btn">Создать книгу</button>
        </form>
    </div>
</template>

<script>
import '~/assets/style/pages/admin/books/create.scss'

export default {
    data() {
        return {
            book: {
                author: '',
                title: '',
                description: '',
                ISBN: '',
                typeId: null,
                locationId: null,
                genreIds: [],
                tagIds: []
            },
            bookTypes: [],
            locations: [],
            genres: [],
            tags: []
        }
    },
    mounted() {
        this.initializeData()
    },
    methods: {
        async initializeData() {
            this.bookTypes = await $fetch('/api/database/bookTypes')
            this.locations = await $fetch('/api/database/locations')
            this.genres = await $fetch('/api/database/genres')
            this.tags = await $fetch('/api/database/tags')
            console.log(this.authors)
        },
        async submitForm() {
            const response = await $fetch('/api/books', {
                method: 'POST',
                body: JSON.stringify(this.book)
            })

            if (!response.ok) {
                const message = `Ошибка произошел: ${response.status}`
                throw new Error(message)
            }

            const result = await response.json()
            console.log(result)
        }
    },
    computed: {
        sortedAuthors() {
            return this.authors.sort((a, b) => (a.author > b.author) ? 1 : -1)
        }
    }
}
</script>

