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
                        <h1>Вход в аккаунт</h1>
                        <p>Авторизуйтесь в библиотечной системе</p>
                    </div>
                </div>
                <div class="form-actions">
                    <button v-if="auth != null" class="btn icon-button"
                        @click="auth.signIn('google', { callbackUrl: this.callback })">
                        <i class="icon fa-brands fa-google"></i>
                        <span>Войти с помощью Google</span>
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

        if (this.$route.query.callbackUrl != null && this.$route.query.callbackUrl != undefined)
            this.callback = this.$route.query.callbackUrl

        if (this.auth.status == 'authenticated') {
            if (this.$route.query.callbackUrl != null && this.$route.query.callbackUrl != undefined)
                navigateTo(this.$route.query.callbackUrl)
            else
                navigateTo('/')
        }
    },
    //данные приложения
    data() {
        return {
            // status, data, lastRefreshedAt, getCsrfToken, getProviders, getSession, signIn, signOut,
            auth: null,
            callback: "/",
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