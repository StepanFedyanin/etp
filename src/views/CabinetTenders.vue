<template>
    <div class="app__main">
        <div
            v-if="$route.name === 'tenders'"
            :class="['cabinet tenders', user?.id ? 'm--justify-flex-start' : '']">
            <div :class="['container', user?.id ? '' : 'm--1460']">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                    ]"
                />
                <div class="h1">
                    Тендеры
                </div>
                <div class="tenders__search">
                    <div class="tenders__search-form">
                        <Search
                            @startSearch="getTenders"
                        />
                    </div>
                    <div
                        v-if="tenders && tenders.count"
                        class="tenders__pagination"
                    >
                        <Pagination
                            :total="tenders.count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </div>
                <div class="tenders__block">
                    <template
                        v-if="showLoaderSending"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <template
                        v-else-if="tenders && tenders.count"
                    >
                        <blockTender
                            v-for="(tender, index) in tenders.results"
                            :key="`tender-${index}`"
                            :tender="tender"
                        />
                    </template>
                    <template
                        v-else
                    >
                        По Вашему запросу ничего не найдено.                    
                    </template>
                </div>
                <div
                    v-if="!showLoaderSending && tenders && tenders.count"
                    class="tenders__pagination"
                >
                    <Pagination
                        :total="tenders.count"
                        :limit="Number(limit)"
                        :currentPage="Number($route.query.page || 1)"
                        :query="$route.query"
                        :url="$route.path"
                    />
                </div>
            </div>
        </div>
        <div 
            v-else
            class="container"
        >
            <router-view />
        </div>
    </div>
</template>

<script>
    import { tender as api } from "@/services";
    import Search from '@/components/app-search.vue';
    import Pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            Search,
            Pagination,
            blockTender
        },
        data() {
            return {
                limit: 10,
                tenders: null,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        watch: {
            limit () {
                if (this.$route.query.page) {
                    this.$router.replace({ query: {} })
                } else {
                    this.getTenders(this.$route.query)
                }
                /*
                if (this.$route.query) {
                    this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) })
                }
                this.getTenders(this.$route.query)
                */
            },
            '$route.query.page': {
                handler() {
                    this.getTenders(this.$route.query)
                },
            }
        },
        mounted() {
            this.getTenders(this.$route.query);
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getTenders(formData) {
                let params = Object.assign({}, formData);
                params.limit = this.limit;
                params.offset = this.offset;
                if (this.$route.query && this.$route.query.category) {
                    params.category = [this.$route.query.category];
                }
                this.showLoaderSending = true;
                api.searchTenders(params).then(tenders => {
                    this.tenders = tenders
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        }
    };
</script>
