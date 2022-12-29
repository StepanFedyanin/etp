<template>
    <div class="cabinet contragents">
        <div class="container">
            <div class="contragents__title h1">
                Контрагенты
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
                <BlockContragents 
                    :contragents="contragents"
                />
                <div class="contragents__block">
                    <div
                        v-if="contragents && contragents.length"
                        class="tenders__pagination"
                    >
                        <div class="tenders__pagination-left">
                            <div class="tenders__pagination-count">
                                Всего: <span>{{ count }}</span>
                            </div>
                        </div>
                        <!--div class="tenders__pagination-left">
                            <div class="tenders__pagination-count">
                                Отобрано: <span>{{ contragents.length }}</span>
                            </div>
                        </div-->
                        <div class="tenders__pagination-right">
                            <div class="tenders__pagination-perpage">
                                <span>Выводить на страницу :</span>
                                <select
                                    v-model="limit"
                                    class="tenders__pagination-select"
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

    export default {
        components: {
            BlockContragents,
            Pagination,
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
                    this.getOrganizations()
                }
            },
            '$route.query.page': {
                handler() {
                    this.getOrganizations()
                },
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            this.getOrganizations();
        },
        methods: {
            getOrganizations(){
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
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
