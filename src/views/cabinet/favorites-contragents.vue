<template>
    <div class="contragents m--direction-column">
        <div 
            v-if="contragents && contragents.length"
            class="contragents__block"
        >
            <div class="contragents__pagination m--top">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :url="$route.path"
                />
            </div>
        </div>
        <template v-if="showLoaderSending">
            <div class="contragents__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else-if="contragents && contragents.length">
            <BlockContragents 
                :contragents="contragents"
                :hideHeader="true"
                @updateData="updateData"
            />
        </template>
        <template v-else>
            <div class="contragents__block">
                По Вашему запросу ничего не найдено.                    
            </div>
        </template>
        <div 
            v-if="contragents && contragents.length && !showLoaderSending"
            class="contragents__block"
        >
            <div class="contragents__pagination m--bottom">
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
            getOrganizations(lazy = false) {
                let params = {
                    limit: +this.limit,
                    offset: this.offset
                }
                if (!lazy) this.showLoaderSending = true;
                cabinet.getMyFavoritesOrganizations(params).then(res => {
                    this.contragents = res.results.map(item => {
                        item.is_favorite = true;
                        return item;
                    });
                    //this.contragents = res;
                    this.count = res.count;
                    if (this.page > 1 && !this.contragents.length) this.$router.replace({ query: { page: this.page - 1 } });
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            },
            updateData() {
                this.getOrganizations(true);
            }
        }
    };
</script>