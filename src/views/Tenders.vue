<template>
    <div class="app__main">
        <div
            v-if="$route.name === 'tenders'"
            :class="['cabinet tenders']">
            <div :class="['container']">
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
        <router-view v-else />
    </div>
</template>

<script>
    import { tender as api } from "@/services";
    import Search from '@/components/app-search.vue';
    import Pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        name: 'Tenders',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Tenders preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            if (currentRoute.name !== 'tenders') return;
            let limit = 10;
            let offset = (currentRoute.query?.page ? currentRoute.query?.page - 1 : 0) * limit;
            let params = {
                offset: offset,
                limit: limit,
                ...Object.assign({}, currentRoute.query)
            };

            await api.searchTenders(params).then(res => {
                let tenders = res;
                store.dispatch('setMeta', {});
                store.dispatch('fetchDataByKey', { data: tenders, key: 'tenders' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
            Search,
            Pagination,
            blockTender
        },
        data() {
            return {
                limit: 10,
                //tenders: null,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            tenders() {
                return this.$store.state.data?.tenders || {};
            },
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                return +this.limit * (this.page - 1);
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler(to) {
                    if (process.env.CLIENT && to === 'tenders') this.getTenders(this.$route.query);
                }
            },
            '$route.query.page': {
                handler(to) {
                    if (to) this.getTenders(this.$route.query)
                },
            }
        },
        created() {
        },
        mounted() {
            //this.getTenders(this.$route.query);
        },
        methods: {
            getTenders(formData) {
                let params = {
                    offset: this.offset,
                    limit: this.limit,
                    ...Object.assign({}, formData)
                };
                if (this.$route.query && this.$route.query.category) {
                    params.category = [this.$route.query.category];
                }
                this.showLoaderSending = true;
                api.searchTenders(params).then(res => {
                    let tenders = res;
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: tenders, key: 'tenders' });
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        }
    };
</script>
