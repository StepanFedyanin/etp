<template>
    <div class="cabinet tenders">
        <div class="container">
            <div class="tenders__search">
                <div class="tenders__search-form">
                    <Search
                        @startSearch="startSearch"
                    />
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
                        <Pagination
                            :total="tenders.count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
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
                limit: 1,
                tenders: null,
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
                    this.getTenders()
                }
            },
            '$route.query.page': {
                handler() {
                    this.getTenders()
                },
            }
        },
        mounted() {
            this.getTenders()
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getTenders() {
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                api.getTenders(params).then(tenders => {
                    this.tenders = tenders
                    // console.log(tenders)
                }).catch(err => {
                    console.error(err)
                })
            },
            startSearch(formData) {
                formData.limit = Number(this.limit)
                formData.offset = this.offset
                console.log(formData)
                api.searchTenders(formData)
                    .then(tenders => {
                        this.tenders = tenders
                        console.log(tenders)
                    }).catch(err => {
                        console.error(err)
                    })
            }
        }
    };
</script>
