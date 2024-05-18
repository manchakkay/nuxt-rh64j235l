<template>
    <div class="auth-wrapper">
        <div class="auth-form">
            <ClientOnly>
                <div class="form-head">
                    <button class="btn icon style-border" @click="$router.back()">
                        <span class="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>
                    <div>
                        <h1>Выход из аккаунта</h1>
                        <p>Чтобы выйти нажмите "Продолжить"</p>
                    </div>
                </div>
                <div class="form-actions">
                    <button v-if="auth != null" class="btn icon-button" @click="auth.signOut()">
                        <i class="icon fa-brands fa-google"></i>
                        <span>Продолжить</span>
                    </button>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts">
import '~/assets/style/pages/auth.scss'

definePageMeta({
    // layout: false
})

export default {
    mounted() {
        this.auth = this.readAuthData()

        if (this.auth.status == 'authenticated') {
            this.auth.signOut()
        }

        if (this.$route.query.callbackUrl != null && this.$route.query.callbackUrl != undefined) {
            navigateTo(this.$route.query.callbackUrl as RouteLocationRaw)
        }
        else {
            navigateTo('/')
        }

    },
    //данные приложения
    data() {
        return {
            // status, data, lastRefreshedAt, getCsrfToken, getProviders, getSession, signIn, signOut,
            auth: null,
        }
    },
    //методы приложения
    methods: {
        //метод получения данных пользователя
        readAuthData() {
            let result = useAuth()
            return result
        },
    }
}
</script>