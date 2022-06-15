<template>
    <div class="cabinet tenders">
        <div class="container">
            <div class="tenders__search">
                <div class="tenders__search-form">
                    <search />
                </div>
                <div
                    v-if="tenders && tenders.count"
                    class="tenders__pagination"
                >
                    <div class="tenders__pagination-left">
                        <div class="tenders__pagination-count">
                            Отобрано по параметрам: <span>{{ tenders.count }}</span>
                        </div>
                    </div>
                    <div class="tenders__pagination-right">
                        <div class="tenders__pagination-perpage">
                            <span>На страницу :</span>
                            <select
                                v-model="limit"
                                class="tenders__pagination-select"
                                name="perPage"
                            >
                                <option
                                    value="1"
                                    selected="selected"
                                >
                                    1 тендер
                                </option>
                                <option
                                    value="2"
                                >
                                    2 тендера
                                </option>
                                <option
                                    value="10"
                                >
                                    10 тендеров
                                </option>
                                <option value="20">
                                    20 тендеров
                                </option>
                                <option value="50">
                                    50 тендеров
                                </option>
                                <option value="100">
                                    100 тендеров
                                </option>
                            </select>
                        </div>
                        <pagination
                            :total="tenders.count"
                            :limit="Number(limit)"
                            :currentPage="currentPage"
                            :url="$route.path"
                        />
                    </div>
                </div>
            </div>
            <div
                v-if="tenders && tenders.count"
                class="tenders"
            >
                <blockTender
                    v-for="(tender, index) in tenders.results"
                    :key="`tender-${index}`"
                    :tender="tender"
                    :whole="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as api } from "@/services";
    import search from '@/components/app-search.vue';
    import pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            search,
            pagination,
            blockTender
        },
        data() {
            return {
                limit: 1,
                currentPage: 1,
                tenders: null,
            }
        },
        watch: {
            limit () {
                this.getTendersFromApi()
            },
            '$route.query.page': {
                immediate: true,
                handler() {
                    this.getTendersFromApi()
                },
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getTendersFromApi() {
                this.limit = Number(this.limit)
                this.currentPage = Number(this.$route.query.page) || 1;
                let params = {
                    limit: this.limit,
                    offset: (this.currentPage - 1) * this.limit,
                }

                api.getTenderTenders(params).then(res => {
                    this.tenders = res
                    // console.log(res)
                }).catch(err => {
                    console.error(err)
                })
            }
        }
    };
</script>
