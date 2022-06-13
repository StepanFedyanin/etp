<template>
    <div class="cabinet tenders">
        <div class="container">
            <div class="tenders__search">
                <div class="tenders__search-form">
                    <search />
                </div>
                <div class="tenders__pagination">
                    <div class="tenders__pagination-left">
                        <div class="tenders__pagination-count">
                            Отобрано по параметрам: <span>50</span>
                        </div>
                    </div>
                    <div class="tenders__pagination-right">
                        <div class="tenders__pagination-perpage">
                            <span>На страницу :</span>
                            <select
                                class="tenders__pagination-select"
                                name="perPage"
                            >
                                <option value="10">
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
                            :current="current"
                            :pageCount="pageCount"
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
                current: 1,
                pageCount: 4,
                tenders: null,
            }
        },
        mounted() {
            api.getTenderTenders().then(res => {
                this.tenders = res
            }).catch(err => {
                console.error(err)
            })
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
        }
    };
</script>
