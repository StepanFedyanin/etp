<template>
    <div class="contragents m--direction-column">
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
                :hideHeader="true"
            />
            <div class="contragents__block">
                <div
                    v-if="contragents && contragents.length"
                    class="tenders__pagination"
                >
                    <Pagination
                        :total="count"
                        :limit="Number(limit)"
                        :currentPage="Number($route.query.page || 1)"
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
</template>

<script>
    import { cabinet } from "@/services";
    import BlockContragents from '@/components/block-contragents.vue';
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            BlockContragents,
            Pagination
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
                cabinet.getMyFavoritesOrganizations(params).then(res => {
                    this.contragents = res.results;
                    //this.contragents = res;
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