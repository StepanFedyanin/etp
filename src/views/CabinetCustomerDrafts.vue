<template>
    <div class="cabinet tenders">
        <div class="container">
            <div class="tenders__search">
                <!--div class="tenders__search-form">
                    <Search
                        @startSearch="startSearch"
                    />
                </div-->
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
                                name="limit"
                            >
                                <option
                                    value="10"
                                    selected="selected"
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
                        <Pagination
                            :total="tenders.count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :url="$route.path"
                        />
                    </div>
                </div>
                <div v-else-if="!showLoaderSending">
                    У вас нет черновиков тендеров.
                </div>
            </div>
            <div class="tenders">
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
                        :drafts="true"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as api } from "@/services";
    //import Search from '@/components/app-search.vue';
    import Pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            //Search,
            Pagination,
            blockTender,
        },
        props: {
            status: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                limit: 10,
                tenders: null,
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
                    this.getDrafts()
                }
            },
            'status': {
                handler() {
                    this.getDrafts()
                },
            },
            '$route.query.page': {
                handler() {
                    this.getDrafts()
                },
            }
        },
        mounted() {
            console.log(this.status);
            this.getDrafts()
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getDrafts() {
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset,
                }
                this.showLoaderSending = true;
                api.getDraftList(params).then(tenders => {
                    this.tenders = tenders
                    this.showLoaderSending = false;
                    console.log(tenders)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        }
    };
</script>
