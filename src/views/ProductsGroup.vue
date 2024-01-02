<template>
    <div :class="['groups']">
        <div :class="['container']">
            <app-breadcrumbs 
                v-if="!showLoaderSending.group"
                :breadcrumbs="[
                    { name: 'Главная', route: { name: 'home' } },
                    { name: 'Товары и услуги', route: { name: 'products' } },
                    { name: 'Категории', route: { name: 'products-groups' } },
                    ...groupBreadcrumbs
                ]"
            />
            <template v-if="showLoaderSending.group">
                <div class="groups__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else>
                <h1 class="groups__title h1">
                    {{ group.name }}
                </h1>
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
                <template v-if="showLoaderSending.group">
                    <div class="groups__main">
                        <div class="groups__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </div>
                </template>
                <template v-else-if="group.categories?.length">
                    <div class="groups__main">
                        <div class="groups__block">
                            <blockGroups
                                :groups="group.categories"
                                routeName="products"
                            />
                        </div>
                    </div>
                </template>
            </template>
            <div class="goods m--block">
                <template v-if="showLoaderSending.goods && !goods.results?.length">
                    <div class="goods__loader loader">
                        <div class="spinner" /> Загрузка товаров
                    </div>
                </template>
                <template v-else>
                    <template v-if="goods.results?.length">
                        <div class="goods__title h2">
                            Товары категории <span>({{ goods.count }})</span>
                        </div>    
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goods.results"
                                :key="`good-${item.id}`"
                                :good="item"
                                :showCategory="false"
                                :showOrganization="true"
                            />
                        </div>
                        <template
                            v-if="showLoaderSending.goods && goods.results?.length"
                        >
                            <div class="goods__loader loader">
                                <div class="spinner" /> Загрузка товаров
                            </div>
                        </template>
                        <template v-else>
                            <button 
                                v-if="goods.count > goods.results.length"
                                class="button button-outline-green tenders__more"
                                @click="getGoods()"
                            >
                                показать еще
                            </button>
                        </template>
                    </template>
                    <template v-else>
                        <blockHint
                            slug="products_not_found"
                            classModifier="goods__hint"
                        />
                    </template>
                </template>
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
</template>

<script>
    import { category as api, product as productApi } from "@/services"
    import blockGroups from '@/components/block-groups.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import blockContent from '@/components/block-content.vue';
    import blockHint from '@/components/block-hint.vue';
    //import Pagination from '@/components/pagination.vue'

    export default {
        name: 'ProductsGroup',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('ProductsGroup preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            let group = {};
            await api.getCategoryProducts(currentRoute.params.slug).then(res => {
                group = res;
                store.dispatch('setMeta', group);
                store.dispatch('fetchDataByKey', { data: group, key: 'group' });
            }).catch(err => {
                if (err.response?.status === 404) store.dispatch('showError', err.response.status);
            });
            let params = {
                limit: 12,
                offset: 0,
                category: group.id,
                children: true
            };
            await productApi.getProducts(params).then(res => {
                let goods = res;
                this.$store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
            }).catch(err => {
                if (err.response?.status === 404) store.dispatch('showError', err.response.status);
            });

        },
        components: {
            blockGroups,
            blockGoodsItem,
            blockContent,
            blockHint
            //Pagination,
        },
        props: {
            parentslug: {
                type: String,
                default() { return null; }
            },
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                offsetGoods: 0,
                limitGoods: 12,
                showLoaderSending: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            group() {
                return this.$store.state.data?.group || {};
            },
            goods() {
                return this.$store.state.data?.goods || {};
            },
            page() {
                return Number(this.$route.query.page) || 1;
            },
            offset() {
                return +this.limitGoods * (this.page - 1);
            },
            groupBreadcrumbs() {
                return this.$store.state.data?.group.breadcrumbs?.map(item => {
                    return { name: item.name, route: { name: 'products-group', params: { slug: item.slug } } };
                }) || [];
            }
        },
        watch: {
            slug: {
                //immediate: true,
                handler(to) {
                    if (to && !process.env.SERVER) this.getGroup();
                },
            },
            '$route.query.page': {
                handler() {
                    //this.getGoods()
                },
            }
        },
        mounted() {
            this.getGroup();
        },
        methods: {
            getGroup() {
                this.showLoaderSending.group = true;
                //this.goods = null;
                //this.countGoods = null;
                //this.tenders = null;
                this.offsetGoods = 0;
                //this.countTenders = null;
                this.$store.dispatch('fetchDataByKey', { data: {}, key: 'goods' });
                api.getCategoryProducts(this.slug).then(res => {
                    let group = res;
                    this.$store.dispatch('setMeta', group);
                    this.$store.dispatch('fetchDataByKey', { data: group, key: 'group' });
                    this.getGoods();
                    this.showLoaderSending.group = false;
                }).catch(err => {
                    this.showLoaderSending.group = false;
                    console.error(err)
                })
            },
            getGoods() {
                this.showLoaderSending.goods = true;
                console.log('getProducts');
                let params = {
                    limit: +this.limitGoods,
                    offset: +this.offsetGoods,
                    category: this.group.id,
                    children: true
                };
                productApi.getProducts(params).then(res => {
                    let goods = res;
                    if (this.offsetGoods !== 0) {
                        goods.results = [...this.goods.results, ...goods.results];
                    }
                    this.offsetGoods += this.limitGoods;
                    this.$store.dispatch('fetchDataByKey', { data: goods, key: 'goods' });
                    this.showLoaderSending.goods = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending.goods = false;
                });
            },
        },
    }
</script>
