<template>
    <div class="app__main">
        <div class="groups">
            <div 
                v-if="!showLoaderSending['group']" 
                class="container"
            >
                <div
                    class="app__breadcrumbs"
                >
                    <router-link
                        :to="{ name: 'home' }"
                        class="app__breadcrumbs-link"
                    >
                        Главная
                    </router-link>
                    <router-link
                        :to="{ name: 'groups' }"
                        class="app__breadcrumbs-link"
                    >
                        Товары и услуги
                    </router-link>
                    <router-link
                        v-if="parentslug"
                        :to="{ name: 'group', params: { slug: group.parent.slug } }"
                        class="app__breadcrumbs-link"
                    >
                        {{ group.parent.name }}
                    </router-link>
                </div>
            </div>
            <div class="container">
                <template
                    v-if="showLoaderSending['group']"
                >
                    <div class="groups__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="group"
                >
                    <h1 
                        class="groups__title h1"
                    >
                        {{ group.name }}
                    </h1>
                    <div
                        v-if="!parentslug"
                        class="group m--margin"
                    >
                        <ul
                            class="group__products"
                        >
                            <li
                                v-for="category in group.categories"
                                :key="category.id"
                                class="group__products-item"
                            >
                                <router-link
                                    :to="{ name: 'group', params: { parentslug: group.slug, slug: category.slug } }"
                                >
                                    {{ category.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </template>
                <div
                    class="goods"
                >
                    <template
                        v-if="showLoaderSending['goods']"
                    >
                        <div class="goods__loader loader">
                            <div class="spinner" /> Загрузка товаров
                        </div>
                    </template>
                    <template
                        v-else-if="goods && countGoods"
                    >    
                        <div class="goods__title">
                            Товары <span>({{ countGoods }})</span>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goods"
                                :key="`good-${item.id}`"
                                :good="item"
                                :showOrganization="true"
                            />
                        </div>
                    </template>
                    <div
                        v-if="countGoods"
                        class="goods__pagination"
                    >
                        <Pagination
                            :total="countGoods"
                            :limit="limitGoods"
                            :currentPage="Number($route.query.page || 1)"
                            :query="$route.query"
                            :url="$route.path"
                        />
                    </div>
                </div>
                <div class="tenders">
                    <template
                        v-if="showLoaderSending['tenders'] && !tenders"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка тендеров
                        </div>
                    </template>
                    <template
                        v-else-if="tenders && countTenders"
                    >
                        <div class="tenders__title">
                            Тендеры <span>({{ countTenders }})</span>
                        </div>    
                        <blockTenderMini
                            v-for="(tender, index) in tenders"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :whole="true"
                        />
                        <template
                            v-if="showLoaderSending['tenders']"
                        >
                            <div class="tenders__loader loader">
                                <div class="spinner" /> Загрузка тендеров
                            </div>
                        </template>
                        <template
                            v-else
                        >
                            <button 
                                v-if="countTenders > tenders.length"
                                class="button button-outline-green tenders__more"
                                @click="getTenders()"
                            >
                                показать еще
                            </button>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as api } from "@/services"
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'Group',
        components: {
            blockGoodsItem,
            blockTenderMini,
            Pagination,
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
                group: null,
                goods: null,
                limitGoods: 18,
                countGoods: null,
                tenders: null,
                offsetTenders: 0,
                limitTenders: 5,
                countTenders: null,
                showLoaderSending: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            page() {
                return Number(this.$route.query.page) || 1;
            },
            offset() {
                return (this.page - 1) * Number(this.limitGoods);
            }
        },
        watch: {
            slug: {
                immediate: true,
                handler() {
                    this.getGroup()
                },
            },
            limitGoods: {
                handler() {
                    if (this.$route.query) {
                        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) })
                    }
                    this.getGoods()
                }
            },
            '$route.query.page': {
                handler() {
                    this.getGoods()
                },
            }
        },
        mounted() {
            //this.getGroup();
        },
        methods: {
            getGroup() {
                this.showLoaderSending['group'] = true;
                this.group = null;
                this.goods = null;
                this.countGoods = null;
                this.tenders = null;
                this.offsetTenders = 0;
                this.countTenders = null;
                if (!this.parentslug) {
                    api.getCategory(this.slug).then(res => {
                        this.group = res;
                        this.$store.dispatch('setMeta', this.group);
                        this.getGoods();
                        this.getTenders();
                        this.showLoaderSending['group'] = false;
                    }).catch(err => {
                        this.showLoaderSending['group'] = false;
                        console.error(err)
                    })
                } else {
                    api.getSubCategory(this.parentslug, this.slug).then(res => {
                        this.group = res
                        this.$store.dispatch('setMeta', this.group);
                        this.getGoods();
                        this.getTenders();
                        this.showLoaderSending['group'] = false;
                    }).catch(err => {
                        this.showLoaderSending['group'] = false;
                        console.error(err)
                    })
                }
            },
            getGoods() {
                this.showLoaderSending['goods'] = true;
                console.log('getGoods');
                let limit = Number(this.limitGoods);
                let params = {
                    limit,
                    offset: this.offset
                };
                if (!this.parentslug) {
                    api.getCategoryProducts(this.slug, params).then(res => {
                        this.goods = res.results;
                        this.countGoods = res.count;
                        this.showLoaderSending['goods'] = false;
                    }).catch(err => {
                        this.showLoaderSending['goods'] = false;
                        console.error(err)
                    })
                } else {
                    api.getSubCategoryProducts(this.parentslug, this.slug).then(res => {
                        this.goods = res.results;
                        this.countGoods = res.count;
                        this.showLoaderSending['goods'] = false;
                    }).catch(err => {
                        this.showLoaderSending['goods'] = false;
                        console.error(err)
                    })
                }
            },
            getTenders() {
                this.showLoaderSending['tenders'] = true;
                console.log('getTenders');
                let limit = Number(this.limitTenders);
                let params = {
                    limit,
                    offset: this.offsetTenders
                };
                if (!this.parentslug) {
                    api.getCategoryTenders(this.slug, params).then(res => {
                        if (this.offsetTenders === 0) {
                            this.tenders = res.results;
                        } else {
                            this.tenders = [...this.tenders, ...res.results];
                        }
                        this.offsetTenders += this.limitTenders;
                        this.countTenders = res.count;
                        this.showLoaderSending['tenders'] = false;
                    }).catch(err => {
                        this.showLoaderSending['tenders'] = false;
                        console.error(err)
                    })
                } else {
                    api.getSubCategoryTenders(this.parentslug, this.slug).then(res => {
                        if (this.offsetTenders === 0) {
                            this.tenders = res.results;
                        } else {
                            this.tenders = [...this.tenders, ...res.results];
                        }
                        this.offsetTenders += this.limitTenders;
                        this.countTenders = res.count;
                        this.showLoaderSending['tenders'] = false;
                    }).catch(err => {
                        this.showLoaderSending['tenders'] = false;
                        console.error(err)
                    })
                }
            }
        },
    }
</script>
