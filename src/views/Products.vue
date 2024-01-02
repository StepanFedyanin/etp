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
                <h1 class="h1">Маркет</h1>
                <blockContent
                    classModifier="m--top"
                    place="top"
                    name="global"
                />
                <blockContent
                    classModifier="m--top"
                    place="top"
                    :name="$route.name"
                />
                <div class="goods__groups groups">
                    <div class="groups__main">
                        <div class="groups__block">
                            <div class="groups__block-title h2">Категории
                                <router-link 
                                    :to="{ name: 'products-groups' }"
                                    class="groups__block-title-more"
                                >
                                    <span>Показать все</span>
                                </router-link>
                            </div>
                            <template v-if="showLoaderSending.groups">
                                <div class="groups__loader loader">
                                    <div class="spinner" /> Загрузка данных
                                </div>
                            </template>
                            <template v-else-if="groups && groups.count">
                                <blockGroups 
                                    :groups="groups.results"
                                    routeName="products"
                                />
                            </template>
                        </div>
                    </div>
                </div>
                <div class="goods__search">
                    <div class="goods__search-form">
                        <Search
                            @startSearch="getGoods"
                        />
                    </div>
                </div>
                <template v-if="showLoaderSending.goods">
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
                            :showCategory="true"
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
                        В данный момент нет ни одного товара
                    </div> 
                </template>
                <div class="goods__groups groups m--pt-2">
                    <div class="groups__main">
                        <div class="groups__block">
                            <div class="groups__block-title h2">Популярные категории
                                <router-link 
                                    :to="{ name: 'products-groups' }"
                                    class="groups__block-title-more"
                                >
                                    <span>Показать все</span>
                                </router-link>
                            </div>
                            <template v-if="showLoaderSending.popular">
                                <div class="groups__loader loader">
                                    <div class="spinner" /> Загрузка данных
                                </div>
                            </template>
                            <template v-else-if="popular && popular.count">
                                <div class="groups__cards">
                                    <router-link
                                        v-for="group in popular.results"
                                        :key="`group-card-${group.id}`"
                                        :to="{ name: 'products-group', params: { slug: group.slug || group.id } }"
                                        class="groups__card"
                                    >
                                        <div class="groups__card-info">
                                            <div class="groups__card-title">{{ group.name }}</div>
                                        </div>
                                        <div :class="['groups__card-icon', !group.photo && 'm--no-icon']">
                                            <img v-if="group.photo" :src="group.photo" alt="group.name" loading="lazy" />
                                        </div>
                                    </router-link>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <blockContent
                    classModifier="m--bottom"
                    place="bottom"
                    name="global"
                />
                <blockContent
                    classModifier="m--bottom"
                    place="bottom"
                    :name="$route.name"
                />
            </div>
        </div>
        <router-view v-else />
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { category as categoryApi, user as api, product as productApi } from "@/services";
    import Search from '@/components/products-search.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import Pagination from '@/components/pagination.vue';
    import blockContent from '@/components/block-content.vue';
    import blockGroups from '@/components/block-groups.vue';

    export default {
        name: 'Products',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Products preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            if (currentRoute.name !== 'products') return;
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
            Search,
            Pagination,
            blockContent,
            blockGroups,
            blockGoodsItem,
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
                showLoaderSending: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            groups() {
                return this.$store.state.data?.groups || {};
            },
            popular() {
                return this.$store.state.data?.popular || {};
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
                immediate: true,
                handler(to) {
                    if (process.env.CLIENT && to === 'products') {
                        this.getGoods();
                        this.getGroups();
                        this.getPopularGroups();
                    }
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
            //this.getGoods();
        },
        methods: {
            getGroups() {
                let page = +this.$route.query.page || 1
                let params = {
                    limit: 36, //this.limit,
                    offset: 0, //(page - 1) * this.limit,
                }
                this.showLoaderSending.groups = true;
                categoryApi.getCategoryListProducts(params).then(res => {
                    let groups = res
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: groups, key: 'groups' });
                    this.showLoaderSending.groups = false;
                }).catch(err => {
                    this.showLoaderSending.groups = false;
                    console.error(err)
                })
            },
            getPopularGroups() {
                let params = {
                    limit: 24, //this.limit,
                    offset: 0, //(page - 1) * this.limit,
                    popular: true
                }
                this.showLoaderSending.popular = true;
                categoryApi.getCategoryPlainListProduct(params).then(res => {
                    let groups = res
                    this.$store.dispatch('fetchDataByKey', { data: groups, key: 'popular' });
                    this.showLoaderSending.popular = false;
                }).catch(err => {
                    this.showLoaderSending.popular = false;
                    console.error(err)
                })
            },
            getGoods(formData) {
                let params = {
                    offset: this.offset,
                    limit: this.limit,
                    ...Object.assign({}, formData)
                    //...Object.assign({}, this.$route.query)
                };
                this.showLoaderSending.goods = true;
                productApi.getProducts(params).then(res => {
                    let goods = res;
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
                    this.showLoaderSending.goods = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending.goods = false;
                })
            },
        },
    }
</script>
