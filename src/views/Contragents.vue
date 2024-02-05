<template>
    <div 
        v-if="$route.name === 'contragents'"
        class="app__main"
    >
        <div :class="['cabinet contragents']">
            <div :class="['container']">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                    ]"
                />
                <div class="contragents__title h1">
                    Контрагенты
                </div>
                <blockContent
                    classModifier="m--top"
                    place="top"
                    name="global"
                />
                <blockContent
                    classModifier="m--top"
                    place="top"
                    :name="$route.name"
                />
                <div class="contragents__search">
                    <SearchContragents
                        @startSearch="getOrganizations"
                    />
                </div>
                <template v-if="showLoaderSending">
                    <div class="contragents__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template v-else-if="contragents.count">
                    <div class="contragents__block">
                        <div class="contragents__pagination m--top">
                            <Pagination
                                :total="contragents.count"
                                :limit="+limit"
                                :currentPage="+$route.query?.page || 1"
                                :query="$route.query"
                                :url="$route.path"
                            />
                        </div>
                    </div>
                    <BlockContragents 
                        :contragents="contragents.results"
                        :hideHeader="true"
                    />
                    <div class="contragents__block">
                        <div class="contragents__pagination m--bottom">
                            <Pagination
                                :total="contragents.count"
                                :limit="+limit"
                                :currentPage="+$route.query?.page || 1"
                                :query="$route.query"
                                :url="$route.path"
                            />
                        </div>
                    </div>
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="global"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        :name="$route.name"
                    />
                </template>
                <template
                    v-else
                >
                    <div class="contragents__block">
                        По Вашему запросу ничего не найдено.                    
                    </div>
                </template>
            </div>
        </div>
    </div>
    <routerView v-else />
</template>

<script>
    import { user as api } from "@/services";
    import BlockContragents from '@/components/block-contragents.vue';
    import Pagination from '@/components/pagination.vue';
    import blockContent from '@/components/block-content.vue';
    import SearchContragents from '@/components/app-search-contragents.vue';

    export default {
        name: 'Contragents',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Contragents preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            let limit = 10;
            let offset = (currentRoute.query?.page ? currentRoute.query?.page - 1 : 0) * limit;
            let params = {
                offset: offset,
                limit: limit,
                ...Object.assign({}, currentRoute.query)
            };

            await api.getOrganizations(params).then(res => {
                let contragents = res;
                store.dispatch('setMeta', {});
                store.dispatch('fetchDataByKey', { data: contragents, key: 'contragents' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
            BlockContragents,
            Pagination,
            blockContent,
            SearchContragents
        },
        props: {
            id: {
                type: Number,
                default() { return null; }
            },
        },
        data() {
            return {
                limit: 10,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            contragents() {
                return this.$store.state.data?.contragents || {};
            },
            page() {
                return +this.$route.query?.page || 1
            },
            offset() {
                return +this.limit * (this.page - 1);
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler(to) {
                    if (to === 'contragents') this.getOrganizations();
                }
            },
            '$route.query.page': {
                handler(to) {
                    if (to) this.getOrganizations();
                },
            }
        },
        created() {
        },
        mounted() {
            //this.getOrganizations();
        },
        methods: {
            getOrganizations() {
                let params = {
                    offset: this.offset,
                    limit: this.limit,
                    ...Object.assign({}, this.$route.query)
                };
                this.showLoaderSending = true;
                api.getOrganizations(params).then(res => {
                    let contragents = res;
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: contragents, key: 'contragents' });
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            }
        }
    };
</script>
