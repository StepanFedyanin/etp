<template>
    <div class="tenders m--block">
        <div class="tenders__search">
            <div 
                v-if="tenders && tenders.count"
                class="tenders__pagination"
            >
                <Pagination
                    :total="tenders.count"
                    :limit="Number(limit)"
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
            <template v-else-if="tenders && tenders.count">
                <blockTender
                    v-for="(tender, index) in tenders.results"
                    :key="`tender-${index}`"
                    :tender="tender"
                />
            </template>
            <template v-else>
                <div class="tenders__empty">
                    В данный момент у вас нет ни одного тендера
                </div> 
            </template>
        </div>
        <div 
            v-if="!showLoaderSending && tenders && tenders.count"
            class="tenders__pagination"
        >
            <Pagination
                :total="tenders.count"
                :limit="Number(limit)"
                :currentPage="Number($route.query.page || 1)"
                :url="$route.path"
            />
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
        created() {
        },
        mounted() {
            console.log(this.status);
            this.getDrafts()
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
