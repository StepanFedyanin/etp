<template>
    <div class="app__main">
        <div 
            class="container"
        >
            <div class="app__breadcrumbs">
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                >
                    Главная
                </router-link>
            </div>
        </div>
        <div
            class="goods container"
        >
            <h1 class="h1">
                Все товары и услуги
            </h1>
            <template
                v-if="showLoaderSending"
            >
                <div class="goods__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else-if="goods && count"
            >    
                <div class="goods__block">
                    <blockGoodsItem
                        v-for="item in goods"
                        :key="`good-${item.id}`"
                        :good="item"
                        :showOrganization="true"
                    />
                </div>
            </template>
            <template
                v-else
            >
                <div class="tenders__empty">
                    В данный момент у вас нет ни одного товара
                </div> 
            </template>
            <div
                class="goods__pagination"
            >
                <div class="goods__pagination-left">
                    <div class="goods__pagination-count">
                        Товаров: <span>{{ count }}</span>
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
                                value="18"
                                selected="selected"
                            >
                                18 товаров
                            </option>
                            <option value="36">
                                36 товаров
                            </option>
                            <option value="54">
                                54 товара
                            </option>
                            <option value="72">
                                72 товара
                            </option>
                        </select>
                    </div>
                    <Pagination
                        :total="count"
                        :limit="limit"
                        :currentPage="Number($route.query.page || 1)"
                        :query="$route.query"
                        :url="$route.path"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { urlPath } from '@/settings';
    import { user as api, product as productApi } from "@/services";
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import Pagination from '@/components/pagination.vue';
    export default {
        name: 'Product',
        components: {
            blockGoodsItem,
            Pagination
        },
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                limit: 18,
                goods: null,
                count: null,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
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
                    this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) })
                }
                this.getGoods()
            },
            '$route.query.page': {
                handler() {
                    this.getGoods()
                },
            }
        },
        created() {
            // this.getInviteStatus();
        },
        mounted() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                console.log('getGoods');
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                };
                this.showLoaderSending = true;
                productApi.getProducts(params).then(res => {
                    this.goods = res.results;
                    this.count = res.count;
                    this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        },
    }
</script>
