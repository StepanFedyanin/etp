<template>
    <div class="app__main">
        <div class="groups">
            <div class="container">
                <div class="app__breadcrumbs">
                    <router-link
                        :to="{ name: 'home' }"
                        class="app__breadcrumbs-link"
                    >
                        Главная
                    </router-link>
                </div>
            </div>
            <div class="container">
                <h1 
                    class="groups__title h1"
                >
                    Товарные группы
                </h1>
                <template
                    v-if="showLoaderSending"
                >
                    <div class="groups__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="groups && groups.count"
                >
                    <div class="groups__main">
                        <div class="groups__blocks">
                            <div
                                v-for="group in groups.results"
                                :key="group.id"
                                class="group"
                            >
                                <router-link
                                    :to="{ name: 'group', params: { slug: group.slug } }"
                                    class="group__title"
                                >
                                    {{ group.name }}
                                </router-link>
                                <div class="group__info">
                                    <div class="group__info-trades">
                                        Тендеров: <span class="group__info-red">{{ group.bidding_count }}/{{ group.tender_count }}</span>
                                    </div>
                                    <div class="group__info-trades">
                                        Товаров: <span class="group__info-red">{{ group.product_count }}</span>
                                    </div>
                                </div>
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
                            <Pagination
                                :total="groups.count"
                                :limit="Number(limit)"
                                :currentPage="Number($route.query.page || 1)"
                                :url="$route.path"
                            />
                        </div>
                        <div class="groups__last">
                            <div class="groups__last-block">
                                <router-link 
                                    :to="{ name: 'products' }"
                                    class="groups__last-title"
                                >
                                    Новые предложения
                                </router-link>
                                <div class="groups__last-goods goods">
                                    <blockGoodsItem
                                        v-for="good in goods"
                                        :key="`good-${good.id}`"
                                        :good="good"
                                        :blockClass="`m--50`"
                                        :showOrganization="true"
                                    />
                                </div>                            
                            </div>
                            <div class="groups__last-block">
                                <router-link 
                                    :to="{ name: 'tenders' }"
                                    class="groups__last-title"
                                >
                                    Новые тендеры
                                </router-link>
                                <div class="groups__last-tenders tenders">
                                    <div 
                                        v-for="tender in tenders"
                                        :key="`tender-${tender.id}`"
                                        class="tenders__item m--small"
                                    >
                                        <router-link
                                            :to="{ name: 'contragent', params: { id: tender.organization.id } }"
                                            target="_blank"
                                            class="tenders__item-organization"
                                        >
                                            {{ tender.organization.full_name ? tender.organization.full_name : '-' }}
                                        </router-link>
                                        <router-link
                                            :to="{ name: 'tender', params: { id: tender.id } }"
                                            class="tenders__item-title"
                                        >
                                            {{ tender.name }}
                                        </router-link>
                                        <div class="tenders__item-price">
                                            {{ tender.price ? $helpers.toPrice(tender.price, {sign: tender.currency_detail}) : 'Цена не указана' }}
                                        </div>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as categoryApi, product as productApi, tender as tenderApi } from "@/services"
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'Groups',
        components: {
            blockGoodsItem,
            Pagination,
        },
        data() {
            return {
                groups: null,
                goods: null,
                tenders: null,
                limit: 10,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            '$route.query.page': {
                immediate: true,
                handler() {
                    this.getGroups();
                    this.getGoods();
                    this.getTenders();
                },
            }
        },
        mounted() {
        },
        methods: {
            getGroups() {
                let page = Number(this.$route.query.page) || 1
                let params = {
                    limit: this.limit,
                    offset: (page - 1) * this.limit,
                }
                this.showLoaderSending = true;
                categoryApi.getCategoryList(params).then(res => {
                    this.groups = res
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
            getGoods() {
                console.log('getGoods');
                let params = {
                    limit: 6,
                    offset: 0
                };
                //this.showLoaderSending = true;
                productApi.getProducts(params).then(res => {
                    this.goods = res.results;
                    //this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    //this.showLoaderSending = false;
                    console.error(err)
                })
            },
            getTenders() {
                console.log('getTenders');
                let params = {
                    limit: 4,
                    offset: 0
                };
                //this.showLoaderSending = true;
                tenderApi.searchTenders(params).then(res => {
                    this.tenders = res.results;
                    //this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    //this.showLoaderSending = false;
                    console.error(err)
                })
            }
        },
    }
</script>
