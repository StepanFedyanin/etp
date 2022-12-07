<template>
    <div class="app__main">
        <div class="container m--1460">
            <div class="app__breadcrumbs">
                <a
                    href="/"
                    class="app__breadcrumbs-link"
                >Главная страница</a>
            </div>
        </div>

        <div class="container m--1460 page">
            <div class="page__content text">
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
                    <h1>{{ page.title }}</h1>
                    <div
                        v-html="page.content"
                    />
                </template>
            </div>
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
