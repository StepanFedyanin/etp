<template>
    <div class="cabinet contragents">
        <div class="container">
            <div class="contragents__title h1">
                Мои контрагенты
            </div>
            <div class="contragents__block">
                <div class="contragents__header">
                    <div class="contragents__header-cell m--name">
                        Название
                    </div>
                    <div class="contragents__header-cell m--activity">
                        Основной вид деятельности
                    </div>
                    <div class="contragents__header-cell m--customer">
                        Заказчик
                    </div>
                    <div class="contragents__header-cell m--member">
                        Участник
                    </div>
                </div>
                <div class="contragents__list">
                    <div 
                        v-for="contragent in this.contragents"
                        :key="`customer-${contragent.id}`"
                        class="contragents__item"
                        @click="onClickContragent(contragent.id)"
                    >
                        <div class="contragents__item-cell m--name">
                            {{ contragent.name }}
                            <div class="m--name-city">
                                {{ contragent.city }}
                            </div>
                        </div>
                        <div class="contragents__item-cell m--activity">
                            {{ contragent.principal_activity }}
                        </div>
                        <div class="contragents__item-cell m--customer">
                            <svg class="svg-icon svg-icon__hammer">
                                <use xlink:href="../assets/img/icons/icons.svg#hammer" />
                            </svg>
                            <span>{{ contragent.created_tenders_count }}</span>
                        </div>
                        <div class="contragents__item-cell m--member">
                            <svg class="svg-icon svg-icon__briefcase">
                                <use xlink:href="../assets/img/icons/icons.svg#briefcase" />
                            </svg>
                            <span>{{ contragent.participation_tenders_count }}</span>
                        </div>
                    </div>
                </div>
                <!-- <button 
                    class="button"
                    @click="getOrganizations()"
                >
                    Показать еще
                </button> -->

                <div
                    v-if="this.contragents && this.contragents.length"
                    class="tenders__pagination"
                >
                    <div class="tenders__pagination-left">
                        <div class="tenders__pagination-count">
                            Всего: <span>{{ this.count }}</span>
                        </div>
                    </div>
                    <div class="tenders__pagination-left">
                        <div class="tenders__pagination-count">
                            Отобрано: <span>{{ this.contragents.length }}</span>
                        </div>
                    </div>
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
                            :total="this.count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :url="$route.path"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
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
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            },
            getOrganizations(){
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                api.getOrganizations(params).then(res => {
                    this.contragents = res.results;
                    this.count = res.count;
                }).catch(err => {
                    console.error(err);
                })
            }

        }
    };
</script>
