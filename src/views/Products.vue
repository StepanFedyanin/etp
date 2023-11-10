<template>
    <div class="app__main">
        <div 
            v-if="$route.name === 'products'"
            :class="['goods']"
        >
            <div :class="['container']">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                    ]"
                />
                <h1 class="h1">
                    Все товары и услуги
                </h1>
                <template v-if="showLoaderSending">
                    <div class="goods__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template v-else-if="goods.count">    
                    <div class="goods__pagination">
                        <Pagination
                            :total="goods.count"
                            :limit="+limit"
                            :currentPage="Number($route.query?.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                    <div class="goods__block">
                        <blockGoodsItem
                            v-for="item in goods.results"
                            :key="`good-${item.id}`"
                            :good="item"
                            :showOrganization="true"
                        />
                    </div>
                    <div class="goods__pagination">
                        <Pagination
                            :total="goods.count"
                            :limit="+limit"
                            :currentPage="Number($route.query?.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="goods__empty">
                        В данный момент у вас нет ни одного товара
                    </div> 
                </template>
            </div>
        </div>
        <router-view v-else />
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { user as api, product as productApi } from "@/services";
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import Pagination from '@/components/pagination.vue';
    export default {
        name: 'Products',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Products preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            let limit = 24;
            let offset = (currentRoute.query?.page ? currentRoute.query?.page - 1 : 0) * limit;
            let params = {
                offset: offset,
                limit: limit,
                ...Object.assign({}, currentRoute.query)
            };

            await productApi.getProducts(params).then(res => {
                let goods = res;
                store.dispatch('setMeta', {});
                store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
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
                limit: 24,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            goods() {
                return this.$store.state.data?.goods || {};
            },
            page() {
                return +this.$route.query?.page || 1
            },
            offset() {
                return +this.limit * (this.page - 1);
            }
        },
        watch: {
            '$route.name': {
                handler(to) {
                    if (to === 'products') this.getGoods();
                }
            },
            '$route.query.page': {
                handler(to) {
                    if (to) this.getGoods();
                },
            }
        },
        created() {
        },
        mounted() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                let params = {
                    offset: this.offset,
                    limit: this.limit,
                    ...Object.assign({}, this.$route.query)
                };
                this.showLoaderSending = true;
                productApi.getProducts(params).then(res => {
                    let goods = res;
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            },
        },
    }
</script>
