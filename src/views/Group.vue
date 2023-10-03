<template>
    <div class="app__main">
        <div :class="['groups', user?.id ? 'm--justify-flex-start' : '']">
            <div 
                v-if="!showLoaderSending['group']" 
                :class="['container', user?.id ? '' : 'm--1460']"
            >
                <app-breadcrumbs 
                    v-if="!showLoaderSending.group"
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Товары и услуги', route: { name: 'groups' } },
                        { name: group.parent?.name, route: { name: 'group', params: { slug: group.parent?.slug || 0 } } },
                    ]"
                />
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
                    <h1 class="groups__title h1">
                        {{ group.name }}
                    </h1>
                    <div
                        v-if="!parentslug"
                        class="group m--margin"
                    >
                        <ul class="group__products">
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
                    class="goods m--block"
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
                        <div class="goods__title h2">
                            Товары <span>({{ countGoods }})</span>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goods"
                                :key="`good-${item.id}`"
                                :good="item"
                                :showCategory="true"
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
                <div class="tenders m--block">
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
                        <div class="tenders__title h2">
                            Тендеры <span>({{ countTenders }})</span>
                        </div>    
                        <blockTender
                            v-for="(tender, index) in tenders"
                            :key="`tender-${index}`"
                            :tender="tender"
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
    import blockTender from '@/components/block-tender.vue';
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'Group',
        components: {
            blockGoodsItem,
            blockTender,
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
