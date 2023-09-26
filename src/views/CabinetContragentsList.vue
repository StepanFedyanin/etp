<template>
    <div :class="['cabinet contragents', user?.id ? 'm--justify-flex-start' : '']">
        <div :class="['container', user?.id ? '' : 'm--1460']">
            <div class="app__breadcrumbs">
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                >
                    Главная
                </router-link>
            </div>
            <div class="contragents__title h1">
                Контрагенты
            </div>
            <div class="contragents__search">
                <SearchContragents
                    @startSearch="getOrganizations"
                />
            </div>
            <template
                v-if="showLoaderSending"
            >
                <div class="contragents__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else-if="contragents && contragents.length"
            >
                <div class="contragents__block">
                    <div
                        v-if="contragents && contragents.length"
                        class="contragents__pagination"
                    >
                        <Pagination
                            :total="count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </div>
                <BlockContragents 
                    :contragents="contragents"
                    :hideHeader="true"
                />
                <div class="contragents__block">
                    <div
                        v-if="contragents && contragents.length"
                        class="contragents__pagination m--no-margin"
                    >
                        <Pagination
                            :total="count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </div>
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
</template>

<script>
    import { user as api } from "@/services";
    import BlockContragents from '@/components/block-contragents.vue';
    import Pagination from '@/components/pagination.vue';
    import SearchContragents from '@/components/app-search-contragents.vue';

    export default {
        components: {
            BlockContragents,
            Pagination,
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
                contragents: [],
                limit: 10,
                count: "",
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
                    this.getOrganizations(this.$route.query)
                }
            },
            '$route.query.page': {
                handler() {
                    this.getOrganizations(this.$route.query)
                },
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            this.getOrganizations(this.$route.query);
        },
        methods: {
            getOrganizations(formData) {
                console.log(formData);
                let limit = Number(this.limit);
                let params = Object.assign({}, formData);
                params.limit = this.limit;
                params.offset = this.offset;
                this.showLoaderSending = true;
                api.getOrganizations(params).then(res => {
                    this.contragents = res.results;
                    this.count = res.count;
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            }
        }
    };
</script>
