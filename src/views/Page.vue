<template>
    <div class="app__main">
        <div class="container m--1460">
            <div class="app__breadcrumbs">
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                >
                    Главная
                </router-link>
            </div>
        </div>

        <div class="container m--1460 page">
            <template
                v-if="showLoaderSending"
            >
                <div class="page__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else-if="page"
            >
                <div class="page__content text">
                    <h1>{{ page.page_name }}</h1>
                    <div
                        v-html="page.content"
                    />
                </div>
                <div 
                    class="page__code"
                    v-html="page.additional_text"
                />
            </template>
        </div>
    </div>
</template>

<script>
    // import Header from '../components/app-header.vue';
    import { common as api } from "@/services"

    export default {
        name: 'Page',
        components: {
            //Header,
        },
        created() {
        },
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                page: {},
                showLoaderSending: false
            };
        },
        mounted() {
            if (this.slug) {
                this.getPage();    
            } else {
                this.$router.push({ name: 'page404' });
            }
        },
        methods: {
            getPage() {
                this.showLoaderSending = true;
                api.getPage(this.slug).then(res => {
                    this.page = res;
                    this.$helpers.setDocumentTitle(this.page);
                    this.$helpers.setDocumentMeta(this.page);
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.$router.push({ name: 'page404' });
                    this.showLoaderSending = false;
                    console.error(err)
                })
            }
        },

    };
</script>
