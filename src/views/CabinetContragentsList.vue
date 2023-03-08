<template>
    <div class="cabinet contragents">
        <div class="container">
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
                        <div class="contragents__pagination-left">
                            <div class="contragents__pagination-count">
                                Всего: <span>{{ count }}</span>
                            </div>
                        </div>
                        <!--div class="contragents__pagination-left">
                            <div class="contragents__pagination-count">
                                Отобрано: <span>{{ contragents.length }}</span>
                            </div>
                        </div-->
                        <div class="contragents__pagination-right">
                            <div class="contragents__pagination-perpage">
                                <span>Выводить на страницу :</span>
                                <select
                                    v-model="limit"
                                    class="contragents__pagination-select"
                                    name="limit"
                                >
                                    <option
                                        value="10"
                                        selected="selected"
                                    >
                                        10 контрагентов
                                    </option>
                                    <option value="20">
                                        20 контрагентов
                                    </option>
                                    <option value="50">
                                        50 контрагентов
                                    </option>
                                    <option value="100">
                                        100 контрагентов
                                    </option>
                                </select>
                            </div>
                            <Pagination
                                :total="count"
                                :limit="Number(limit)"
                                :currentPage="Number($route.query.page || 1)"
                                :query="$route.query"
                                :url="$route.path"
                            />
                        </div>
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
                        <div class="contragents__pagination-left">
                            <div class="contragents__pagination-count">
                                Всего: <span>{{ count }}</span>
                            </div>
                        </div>
                        <!--div class="contragents__pagination-left">
                            <div class="contragents__pagination-count">
                                Отобрано: <span>{{ contragents.length }}</span>
                            </div>
                        </div-->
                        <div class="contragents__pagination-right">
                            <div class="contragents__pagination-perpage">
                                <span>Выводить на страницу :</span>
                                <select
                                    v-model="limit"
                                    class="contragents__pagination-select"
                                    name="limit"
                                >
                                    <option
                                        value="10"
                                        selected="selected"
                                    >
                                        10 контрагентов
                                    </option>
                                    <option value="20">
                                        20 контрагентов
                                    </option>
                                    <option value="50">
                                        50 контрагентов
                                    </option>
                                    <option value="100">
                                        100 контрагентов
                                    </option>
                                </select>
                            </div>
                            <Pagination
                                :total="count"
                                :limit="Number(limit)"
                                :currentPage="Number($route.query.page || 1)"
                                :query="$route.query"
                                :url="$route.path"
                            />
                        </div>
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
