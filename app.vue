<script setup lang="ts">
import('~/assets/style/components/appHeader.scss')
</script>

<template>
    <div>
        <header>
            <ClientOnly>
                <div class="header-logo"></div>
                <div class="header-actions"></div>
                <div class="header-account" v-if="auth != null">
                    <template v-if="auth.status == 'authenticated'">
                        <div class="user-info">
                            <img class="user-img" :src="auth.data.user.image">
                            <div class="user-text">
                                <span class="user-name">{{ auth.data.user.name }}</span>
                                <span class="user-email">{{ auth.data.user.email }}</span>
                            </div>

                        </div>
                        <a class="btn icon" @click="auth.signOut()">
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                        </a>
                    </template>
                    <template v-else>
                        <NuxtLink to="/login" class="btn"> Вход в аккаунт </NuxtLink>
                    </template>
                </div>
            </ClientOnly>
        </header>
        <!-- <NuxtLayout> -->
        <NuxtPage />
        <!-- </NuxtLayout> -->
    </div>
</template>

<script lang="ts">
export default {
    mounted() {
        this.auth = this.readAuthData()
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
};
</script>