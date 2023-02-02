<template>
    <div class="app__main">
        <div 
            v-if="!showLoaderSending['product']"
            class="container"
        >
            <div class="app__breadcrumbs">
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                    v-text="`Главная`"
                />
                <router-link
                    :to="{ name: 'groups' }"
                    class="app__breadcrumbs-link"
                    v-text="`Товары и услуги`"
                />
                <router-link
                    :to="{ name: 'group', params: { slug: good.category_detail.parent.slug } }"
                    class="app__breadcrumbs-link"
                    v-text="good.category_detail.parent.name"
                />
                <router-link
                    :to="{ name: 'group', params: { parentslug: good.category_detail.parent.slug, slug: good.category_detail.slug } }"
                    class="app__breadcrumbs-link"
                    v-text="good.category_detail.name"
                />
            </div>
        </div>
        <div class="good">
            <div class="container">
                <template
                    v-if="showLoaderSending['product']"
                >
                    <div class="good__loader loader">
                        <div class="spinner" /> Загрузка данных о товаре
                    </div>
                </template>
                <template
                    v-else-if="good"
                >
                    <h1 
                        class="good__title h1"
                    >
                        {{ good.name }}
                    </h1>
                    <div class="good__block">
                        <div class="good__block-left">
                            <div class="good__block-card">
                                <div class="good__params">
                                    <div class="good__param">
                                        <div class="good__param-name">
                                            Поставщик
                                        </div>
                                        <router-link 
                                            :to="{ name: 'contragent', params: { id: good.organization.id } }"
                                            class="good__param-data"
                                        >
                                            {{ good.organization.name }}
                                        </router-link>
                                    </div>

                                    <div class="good__param">
                                        <div class="good__param-name">
                                            Единица измерения
                                        </div>
                                        <div class="good__param-data">
                                            {{ good.unit }}
                                        </div>
                                    </div>

                                    <div class="good__param">
                                        <div class="good__param-name">
                                            Дата обновления
                                        </div>
                                        <div class="good__param-data">
                                            {{ $helpers.formatDate(new Date(good.updated), 'DD.MM.YYYY', 'Europe/Moscow') }}
                                        </div>
                                    </div>

                                    <div class="good__param">
                                        <div class="good__param-name">
                                            Код позиции ЭТП
                                        </div>
                                        <div class="good__param-data">
                                            {{ good.category_detail.parent.code }}-{{ good.category_detail.code }}-{{ good.id }}
                                        </div>
                                    </div>
                                </div> 
                                <div 
                                    v-if="good.description"
                                    class="good__block-info"
                                >
                                    <div class="good__block-title">
                                        О товаре
                                    </div>
                                    <div 
                                        class="good__block-content"
                                        v-html="good.description"
                                    />
                                </div>                           
                            </div>
                            <div 
                                class="good__price"
                            >
                                <div class="good__price-value">
                                    {{ $helpers.toPrice(good.price, { sign: good.currency_detail }) }}
                                </div>
                                <button 
                                    v-if="!user || !user.id || user.organization.id !== good.organization.id"
                                    class="button button-green good__price-button"
                                    @click.prevent="requestGood()"
                                >
                                    Отправить заявку
                                </button>
                            </div>
                        </div>
                        <div class="good__block-right">
                            <div 
                                class="good__photo"
                                :class="good.photo ? '' : 'm--no-photo'"
                            >
                                <div class="good__photo-inner">
                                    <template
                                        v-if="good.photo"
                                    >
                                        <img 
                                            :src="good.photo"
                                            :alt="good.name"
                                        />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="good__contragent contragent">
                        <div class="good__contragent-title">
                            О поставщике
                        </div>
                        <blockContragent 
                            :contragent="good.organization"
                            @toggleFavorite="toggleFavorite"
                        />
                    </div>
                </template>
                <template
                    v-if="goodsOrganizationTotal"
                >
                    <div class="good__list goods">
                        <div class="goods__title">
                            Все товары поставщика <span>({{ goodsOrganizationTotal }})</span>
                        </div>
                        <div 
                            class="goods__block"
                        >
                            <blockGoodsItem
                                v-for="item in goodsOrganization"
                                :key="`good-organization-${item.id}`"
                                :good="item"
                                :showCategory="true"
                                :showOrganization="false"
                            />
                        </div>
                        <template
                            v-if="showLoaderSending['organization']"
                        >
                            <div class="good__loader loader">
                                <div class="spinner" /> Загрузка данных о товарах поставщика
                            </div>
                        </template>
                        <template
                            v-else
                        >
                            <button 
                                v-if="goodsOrganizationTotal > goodsOrganization.length"
                                class="button button-outline-green goods__more"
                                @click.prevent="getOrganizationGoods()"
                            >
                                показать еще
                            </button>
                        </template>
                    </div>
                </template>
                <template
                    v-if="goodsCategoryTotal"
                >
                    <div class="good__list goods">
                        <div class="goods__title">
                            Товары из категории «{{ good.category_detail.name }}» <span>({{ goodsCategoryTotal }})</span>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goodsCategory"
                                :key="`good-category-${item.id}`"
                                :good="item"
                                :showCategory="false"
                                :showOrganization="true"
                            />
                        </div>
                        <template
                            v-if="showLoaderSending['category']"
                        >
                            <div class="good__loader loader">
                                <div class="spinner" /> Загрузка данных о товарах категории
                            </div>
                        </template>
                        <template
                            v-else
                        >
                            <button 
                                v-if="goodsCategoryTotal > goodsCategory.length"
                                class="button button-outline-green goods__more"
                                @click.prevent="getCategoryGoods()"
                            >
                                показать еще
                            </button>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <ModalRequestGood
            v-if="showRequestGoodModal"
            :good="good"
            :showModal="showRequestGoodModal"
            @hideModal="hideRequestGoodModal"
        />
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { urlPath } from '@/settings';
    import { user as api, product as productApi } from "@/services";
    import blockContragent from '@/components/block-contragent.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import ModalRequestGood from '@/components/modal-request-good.vue';

    export default {
        name: 'Product',
        components: {
            blockContragent,
            blockGoodsItem,
            ModalRequestGood
        },
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                urlPath,
                good: null,
                goodsOrganization: null,
                goodsOrganizationTotal: null,
                goodsOrganizationLimit: 18,
                goodsOrganizationOffset: 0,
                goodsCategory: null,
                goodsCategoryTotal: null,
                goodsCategoryLimit: 18,
                goodsCategoryOffset: 0,
                showLoaderSending: {},
                showRequestGoodModal: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            slug: {
                immediate: true,
                handler() {
                    this.getGood();
                },
            }
        },
        mounted() {
        },
        methods: {
            getGood() {
                this.showLoaderSending['product'] = true;
                this.goodsOrganization = null;
                this.goodsOrganizationOffset = 0;
                this.goodsCategory = null;
                this.goodsCategoryOffset = 0;
                let params = {
                };
                productApi.getProduct(this.slug, params).then(res => {
                    console.log(res);
                    this.good = res;
                    this.showLoaderSending['product'] = false;
                    this.getOrganizationGoods();
                    this.getCategoryGoods();
                }).catch(err => {
                    this.showLoaderSending['product'] = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getOrganizationGoods() {
                this.showLoaderSending['organization'] = true;
                let params = {
                    limit: this.goodsOrganizationLimit,
                    offset: this.goodsOrganizationOffset,
                    organization: this.good.organization.id,
                    exclude_slug: this.slug
                };
                productApi.getProducts(params).then(res => {
                    console.log(res);
                    if (!this.goodsOrganization) {
                        this.goodsOrganization = res.results;
                    } else {
                        this.goodsOrganization = [...this.goodsOrganization, ...res.results];
                    }
                    this.goodsOrganizationOffset = this.goodsOrganizationOffset + this.goodsOrganizationLimit;
                    this.goodsOrganizationTotal = res.count;
                    this.showLoaderSending['organization'] = false;
                }).catch(err => {
                    this.showLoaderSending['organization'] = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getCategoryGoods() {
                this.showLoaderSending['category'] = true;
                let params = {
                    limit: this.goodsCategoryLimit,
                    offset: this.goodsCategoryOffset,
                    category: this.good.category,
                    exclude_slug: this.slug
                };
                productApi.getProducts(params).then(res => {
                    console.log(res);
                    if (!this.goodsCategory) {
                        this.goodsCategory = res.results;
                    } else {
                        this.goodsCategory = [...this.goodsCategory, ...res.results];
                    }
                    this.goodsCategoryOffset = this.goodsCategoryOffset + this.goodsCategoryLimit;
                    this.goodsCategoryTotal = res.count;
                    this.showLoaderSending['category'] = false;
                }).catch(err => {
                    this.showLoaderSending['category'] = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            toggleFavorite() {
                this.good.organization.is_favorite = !this.good.organization.is_favorite;
                api.switchFavoriteOrganization(this.good.organization.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            requestGood() {
                console.log('BLA');
                this.showRequestGoodModal = true;
            },
            hideRequestGoodModal(updateData) {
                this.showRequestGoodModal = false;
                if (updateData) {
                    this.getGood();
                    //this.$emit('getTenderData');
                }
            },

        },
    }
</script>
