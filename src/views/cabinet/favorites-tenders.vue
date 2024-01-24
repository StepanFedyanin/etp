<template>
    <div class="tenders m--block">
        <div 
            v-if="tenders && tenders.length"
            class="tenders__block"
        >
            <div class="tenders__pagination">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :url="$route.path"
                />
            </div>
        </div>
        <div class="tenders__block">
            <template v-if="showLoaderSending">
                <div class="tenders__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else-if="tenders && tenders.length">
                <blockTender
                    v-for="tender in tenders"
                    :key="`tender-${tender.id}`"
                    :tender="tender"
                    @updateData="updateData"
                />
            </template>
            <template v-else>
                У вас нет избранных тендеров.
            </template>
        </div>
        <div 
            v-if="tenders && tenders.length && !showLoaderSending"
            class="tenders__block"
        >
            <div class="tenders__pagination">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :url="$route.path"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import Pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            Pagination,
            blockTender
        },
        data() {
            return {
                tenders: [],
                limit: 10,
                count: null,
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
                if (this.$route.query) {
                    this.$router.replace({ query: {} })
                }
                this.getFavoritesTenders();
            },
            '$route.query.page': {
                handler() {
                    this.getFavoritesTenders();
                },
            }
        },
        mounted() {
            this.getFavoritesTenders();
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getFavoritesTenders(lazy = false) {
                let params = {
                    limit: +this.limit,
                    offset: this.offset
                };
                if (!lazy) this.showLoaderSending = true;
                tenderApi.getFavoritesTenders(params).then(res => {
                    this.tenders = res.results;
                    this.count = res.count;
                    if (this.page > 1 && !this.tenders.length) this.$router.replace({ query: { page: this.page - 1 } });
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                })
            },
            updateData() {
                this.getFavoritesTenders(true);
            }
        }
    };
</script>