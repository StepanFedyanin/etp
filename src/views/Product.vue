<template>
    <div :class="['good contragent']">
        <div :class="['container']">
            <template v-if="showLoaderSending.product">
                <div class="good__loader loader">
                    <div class="spinner" /> Загрузка данных о товаре
                </div>
            </template>
            <template v-else-if="good.id">
                <app-breadcrumbs 
                    v-if="!showLoaderSending.product"
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Товары и услуги', route: { name: 'products' } },
                        ...goodBreadcrumbs
                    ]"
                />
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
                <div class="good__block m--top">
                    <div class="good__block-left">
                        <div class="good__block-card">
                            <h1 class="good__title">{{ good.name }}</h1>
                            <div class="good__info">
                                <div v-if="good.min_count" class="good__info-param m--count">Заказ от {{ good.min_count }} ед.</div>
                                <div v-if="good.nds" class="good__info-param m--nds">НДС: {{ good.nds }}</div>
                                <div v-if="showTypeBuyer && good.type_of_buyer" class="good__info-param m--buyer">{{ good.type_of_buyer === 'organization' ? 'B2B' : 'B2C' }}</div>
                            </div>
                            <div class="h3">Цена</div>
                            <div class="good__price">
                                <div class="good__price-value">
                                    {{ good.price ? $helpers.toPrice(good.price, { sign: good.currency_detail }) : 'Цена по запросу' }}
                                    <span>/ {{ good.unit }}</span>
                                </div>
                                <template v-if="!user || !user.id || user.marketplace_user?.id !== good.marketplace_user?.id">
                                    <div class="good__price-order">
                                        <FormKit
                                            v-model="good.count"
                                            type="counter"
                                            name="count"
                                            :min="good.min_count || 1"
                                            max="9999"
                                            :value="good.min_count || 1"
                                            :disabled="!user?.id"
                                            outerClass="good__price-counter"
                                        />
                                        <button 
                                            class="button button-green good__price-button"
                                            :disabled="!user?.id"
                                            @click.prevent="requestGood()"
                                        >
                                            Заказать
                                        </button>
                                    </div>
                                </template>
                                <template v-else-if="user && user.marketplace_user?.id === good.marketplace_user?.id">
                                    <button 
                                        class="button button-green good__price-button"
                                        @click.prevent="$router.push({ name: 'market-good-edit', params: { goodId: good.id } })"
                                    >
                                        Изменить товар
                                    </button>
                                </template>
                            </div>
                            <div class="h3">Характеристики</div>
                            <div class="good__params">
                                <!--div v-if="good.type_of_buyer" class="good__param">
                                    <div class="good__param-name">Заказ</div>
                                    <div class="good__param-data">{{ good.type_of_buyer === 'organization' ? 'Для юридических лиц' : 'Для физических лиц' }}</div>
                                </div-->
                                <div class="good__param">
                                    <div class="good__param-name">Продавец</div>
                                    <div :class="['good__param-data m--icon', `m--${good.marketplace_user?.type}`]">{{ good.marketplace_user?.name }}</div>
                                </div>
                                <div v-if="good.min_count" class="good__param">
                                    <div class="good__param-name">Минимальный заказ</div>
                                    <div class="good__param-data">{{ good.min_count }} {{ good.unit }}</div>
                                </div>
                                <div v-if="good.unit" class="good__param">
                                    <div class="good__param-name">Единица измерения</div>
                                    <div class="good__param-data">{{ good.unit }}</div>
                                </div>
                                <div v-if="good.nds" class="good__param">
                                    <div class="good__param-name">НДС</div>
                                    <div class="good__param-data">{{ good.nds }}</div>
                                </div>
                                <div v-if="good.delivery_min_cost" class="good__param">
                                    <div class="good__param-name">Стоимость доставки</div>
                                    <div class="good__param-data">от {{ $helpers.toPrice(good.delivery_min_cost, { sign: good.currency_detail }) }}</div>
                                </div>
                                <div v-if="good.delivery_time" class="good__param">
                                    <div class="good__param-name">Срок доставки по РФ, дн.</div>
                                    <div class="good__param-data">{{ good.delivery_time }}</div>
                                </div>
                                <div v-if="good.brand" class="good__param">
                                    <div class="good__param-name">Бренд</div>
                                    <div class="good__param-data">{{ good.brand }}</div>
                                </div>
                                <div v-if="good.article" class="good__param">
                                    <div class="good__param-name">Артикул</div>
                                    <div class="good__param-data">{{ good.article }}</div>
                                </div>
                                <div v-if="good.in_stock" class="good__param">
                                    <div class="good__param-name">Наличие</div>
                                    <div class="good__param-data">{{ goodInStock[good.in_stock] }}</div>
                                </div>
                                <div v-if="good.production_time" class="good__param">
                                    <div class="good__param-name">Срок до отгрузки, дн.</div>
                                    <div class="good__param-data">{{ good.production_time }}</div>
                                </div>
                            </div>
                            <div class="h3">Читайте также</div>
                            <div class="good__menu m--inline">
                                <a v-if="good.about" @click.prevent="scrollTo('about')" href="#" class="good__menu-link">О товаре</a>
                                <a v-if="good.delivery_terms || good.payment_terms" @click.prevent="scrollTo('delivery')" href="#" class="good__menu-link">Доставка и оплата</a>
                                <a v-if="good.marketplace_user" @click.prevent="scrollTo('organization')" href="#" class="good__menu-link">О продавце</a>
                                <a v-if="hints.length" @click.prevent="scrollTo('help')" href="#" class="good__menu-link">Как сделать заказ?</a>
                            </div>
                        </div>
                    </div>
                    <div class="good__block-right">
                        <div :class="['good__photo', !good.photos?.length && 'm--no-photo']">
                            <div class="good__photo-inner">
                                <template v-if="good.photos?.length">
                                    <img 
                                        :src="good.photos[currentPhoto].photo"
                                        :alt="good.name"
                                        @click.prevent="showPhotoGoodModal = true;"
                                    >
                                </template>
                            </div>
                        </div>

                        <div v-if="good.photos?.length > 1" class="good__thumbs">
                            <div 
                                v-for="(item, index) in good.photos"
                                :key="`thumb-${item.id}`"
                                :class="['good__thumbs-item', (index === currentPhoto) && 'is-active']"
                                @click.prevent="changeCurrentPhoto(index)"
                            >
                                <div class="good__thumbs-item-inner">
                                    <img 
                                        :src="item.photo"
                                        :alt="good.name"
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="good__info m--second">
                            <div class="good__info-param m--no-icon"># {{ good.id }}</div>
                            <div class="good__info-param m--views">{{ good.views }}</div>
                            <div class="good__info-param m--updated">{{ $helpers.formatDate(new Date(good.updated), 'DD.MM.YY', 'Europe/Moscow') }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="good.about" class="good__block" ref="about">
                    <div class="good__block-info">
                        <div class="good__block-title h2">О товаре</div>
                        <div 
                            class="good__block-content"
                            v-html="good.about?.replace(/\n/g, '<br/>')"
                        />
                    </div>
                </div>
                <div v-if="good.delivery_terms || good.payment_terms" class="good__block" ref="delivery">
                    <div class="good__block-info">
                        <div class="good__block-title h2">Доставка и оплата</div>
                        <div 
                            v-if="good.delivery_terms"
                            class="good__block-content"
                            v-html="`<strong>Условия доставки:</strong> ${good.delivery_terms?.replace(/\n/g, '<br/>')}`"
                        />
                        <div 
                            v-if="good.payment_terms"
                            class="good__block-content"
                            v-html="`<strong>Условия оплаты:</strong> ${good.payment_terms?.replace(/\n/g, '<br/>')}`"
                        />
                    </div>
                </div>
                <div v-if="good.marketplace_user" class="good__contragent" ref="organization">
                    <div class="good__contragent-title h2">
                        <div>Продавец</div>
                        <a 
                            v-if="user?.id && user.marketplace_user?.id !== good.marketplace_user?.id"
                            href="#"
                            class="good__contragent-title-more"
                            @click.prevent="startChat(good.marketplace_user?.id)"
                        >
                            <span>Написать в чат</span>
                        </a>
                    </div>
                    <div class="good__block m--reverse">
                        <div class="good__block-left">
                            <div class="good__params good__contragent-params">
                                <div class="good__params m--inline">
                                    <div class="good__param">
                                        <div class="good__param-data">{{ good.marketplace_user?.name }}</div>
                                    </div>
                                    <div class="good__param m--sm">
                                        <div :class="['good__param-data m--normal m--icon', `m--${good.marketplace_user.type}`]">{{ good.marketplace_user.type === 'organization' ? 'Организация' : 'Физ. лицо' }}</div>
                                    </div>
                                    <div class="good__param m--sm">
                                        <div class="good__param-data m--normal m--icon m--count">{{ $helpers.stringForNumber(goodsOrganization.count, ['товар', 'товара', 'товаров']) }} на TUGAN</div>
                                    </div>
                                </div>
                                <div v-if="good.marketplace_user?.city" class="good__param">
                                    <div class="good__param-name">Город</div>
                                    <div class="good__param-data">{{ good.marketplace_user?.city }}</div>
                                </div>
                                <div v-if="good.marketplace_user?.phone" class="good__param">
                                    <div class="good__param-name">Контактный телефон</div>
                                    <a :href="`tel:${good.marketplace_user?.phone}`" class="good__param-data">{{ good.marketplace_user?.phone }}</a>
                                </div>
                                <div v-if="good.marketplace_user?.email" class="good__param">
                                    <div class="good__param-name">Контактный email</div>
                                    <a :href="`mailto:${good.marketplace_user?.email}`" class="good__param-data">{{ good.marketplace_user?.email }}</a>
                                </div>
                                <div v-if="good.marketplace_user?.site" class="good__param">
                                    <div class="good__param-name">Сайт</div>
                                    <a :href="good.marketplace_user?.site" target="_blank" class="good__param-data">{{ good.marketplace_user?.site }}</a>
                                </div>
                            </div>
                            <div 
                                v-if="good.marketplace_user?.about"
                                class="good__block-content"
                                v-html="good.marketplace_user?.about?.replace(/\n/g, '<br/>')"
                            />

                            <!--blockContragent 
                                :contragent="good.organization"
                                @toggleFavorite="toggleFavorite"
                            /-->
                        </div>
                        <div class="good__block-right">
                            <div v-if="good.marketplace_user?.logo" class="good__contragent-logo">
                                <img 
                                    :src="good.marketplace_user?.logo" 
                                    :alt="good.marketplace_user?.name" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="hints.length" class="good__block" ref="help">
                    <div class="good__block-info">
                        <div 
                            v-for="hint in hints"
                            :key="`hint-${hint.id}`"
                            class="app__content-hint hint"
                        >
                            <div v-if="hint.subject" :class="['hint__title', `m--${hint.type}`]">{{ hint.subject }}</div>
                            <div 
                                class="hint__content text"
                                v-html="hint.content"
                            />
                        </div>
                    </div>
                </div>
                <template v-if="goodsOrganization.count">
                    <div class="good__list goods m--block">
                        <div class="goods__title h2">
                            Все товары продавца <span>({{ goodsOrganization.count }})</span>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goodsOrganization.results"
                                :key="`good-organization-${item.id}`"
                                :good="item"
                                :showCategory="true"
                                :showOrganization="false"
                            />
                        </div>
                        <template v-if="showLoaderSending.organization">
                            <div class="good__loader loader">
                                <div class="spinner" /> Загрузка данных о товарах продавца
                            </div>
                        </template>
                        <template v-else>
                            <button 
                                v-if="goodsOrganization.count > goodsOrganization.results?.length"
                                class="button button-outline-green goods__more"
                                @click.prevent="getSellerGoods()"
                            >
                                показать еще
                            </button>
                        </template>
                    </div>
                </template>
                <template v-if="goodsCategory.count">
                    <div class="good__list goods m--block">
                        <div class="goods__title h2">
                            Товары из категории «{{ good.category_detail.name }}» <span>({{ goodsCategory.count }})</span>
                        </div>
                        <div class="goods__block">
                            <blockGoodsItem
                                v-for="item in goodsCategory.results"
                                :key="`good-category-${item.id}`"
                                :good="item"
                                :showCategory="false"
                                :showOrganization="true"
                            />
                        </div>
                        <template v-if="showLoaderSending.category">
                            <div class="good__loader loader">
                                <div class="spinner" /> Загрузка данных о товарах категории
                            </div>
                        </template>
                        <template v-else>
                            <button 
                                v-if="goodsCategory.count > goodsCategory.results?.length"
                                class="button button-outline-green goods__more"
                                @click.prevent="getCategoryGoods()"
                            >
                                показать еще
                            </button>
                        </template>
                    </div>
                </template>
            </template>
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
        <ModalGoodRequest
            v-if="showRequestGoodModal"
            :good="good"
            :showModal="showRequestGoodModal"
            @hideModal="hideRequestGoodModal"
        />
        <ModalGoodPhoto
            v-if="showPhotoGoodModal"
            :photo="good.photos[currentPhoto]"
            :showModal="showPhotoGoodModal"
            @hideModal="hidePhotoGoodModal"
        />
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { urlPath } from '@/settings';
    import { user as api, product as productApi, cabinet, common, chat as chatApi } from '@/services';
    //import blockContragent from '@/components/block-contragent.vue';
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import blockContent from '@/components/block-content.vue';
    import ModalGoodRequest from '@/components/modals/good-request.vue';
    import ModalGoodPhoto from '@/components/modals/good-photo.vue';

    export default {
        name: 'Product',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Product preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            await productApi.getProduct(currentRoute.params?.slug).then(res => {
                let good = res;
                store.dispatch('setMeta', good);
                store.dispatch('fetchDataByKey', { data: good, key: 'good' });
                let params = {
                    limit: 18,
                    offset: 0,
                    organization: good.organization.id,
                    exclude_slug: good.slug
                };
                console.log(params);
                productApi.getProducts(params).then(res => {
                    let goodsOrganization = res;
                    store.dispatch('fetchDataByKey', { data: goodsOrganization, key: 'goodsOrganization' });
                });
                delete params.organization;
                params.category = good.category;
                console.log(params);
                productApi.getProducts(params).then(res => {
                    let goodsCategory = res;
                    store.dispatch('fetchDataByKey', { data: goodsCategory, key: 'goodsCategory' });
                });
            }).catch(err => {
                store.dispatch('fetchDataByKey', { data: {}, key: 'good' });
                if (err.response?.status === 404) store.dispatch('showError', err.response?.status);
            });
        },
        components: {
            //blockContragent,
            blockGoodsItem,
            blockContent,
            ModalGoodRequest,
            ModalGoodPhoto
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
                showTypeBuyer: false,
                currentPhoto: 0,
                hints: [],
                goodInStock: {
                    in_stock: 'В наличии',
                    under_order: 'Под заказ',
                },
                //good: {},
                //goodsOrganization: null,
                //goodsOrganizationTotal: null,
                goodsOrganizationLimit: 18,
                goodsOrganizationOffset: 0,
                //goodsCategory: null,
                //goodsCategoryTotal: null,
                goodsCategoryLimit: 18,
                goodsCategoryOffset: 0,
                showLoaderSending: {
                    product: process.env.CLIENT
                },
                showRequestGoodModal: false,
                showPhotoGoodModal: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            good() {
                return this.$store.state.data?.good || {};
            },
            goodsOrganization() {
                return this.$store.state.data?.goodsOrganization || {};
            },
            goodsCategory() {
                return this.$store.state.data?.goodsCategory || {};
            },
            goodBreadcrumbs() {
                return this.$store.state.data?.good.breadcrumbs.map(item => {
                    return { name: item.name, route: { name: 'products-group', params: { slug: item.slug } } };
                })
            }
        },
        watch: {
            slug: {
                immediate: true,
                handler() {
                    if (process.env.CLIENT) this.getGood();
                },
            }
        },
        mounted() {
            //this.getGood();
        },
        methods: {
            getGood() {
                this.$store.dispatch('fetchDataByKey', { data: {}, key: 'goodsOrganization' });
                this.$store.dispatch('fetchDataByKey', { data: {}, key: 'goodsCategory' });
                this.showLoaderSending.product = true;
                //this.goodsOrganization = null;
                this.goodsOrganizationOffset = 0;
                //this.goodsCategory = null;
                this.goodsCategoryOffset = 0;
                productApi.getProduct(this.slug).then(res => {
                    let good = res;
                    this.$store.dispatch('fetchDataByKey', { data: good, key: 'good' });
                    this.$store.dispatch('setMeta', good);
                    this.showLoaderSending.product = false;
                    this.getSellerGoods();
                    this.getCategoryGoods();
                    this.getHint('product_howtobuy');
                }).catch(err => {
                    this.$store.dispatch('fetchDataByKey', { data: {}, key: 'good' });
                    this.$store.dispatch('setMeta', {});
                    //if (err.response.status === 404) this.$store.dispatch('showError', err.response.status)
                    if (err.response?.status === 404) this.$router.replace({ name: 'page404' });
                    //this.showLoaderSending.product = false;
                });
            },
            getHint(slug) {
                let params = { slug: slug };
                common.getHint(params).then(res => {
                    this.hints = res.results;
                }).catch(err => {
                    console.error(err)
                })
            },
            getSellerGoods() {
                if (!this.good.marketplace_user?.id) return;
                this.showLoaderSending.organization = true;
                let params = {
                    limit: this.goodsOrganizationLimit,
                    offset: this.goodsOrganizationOffset,
                    seller: this.good.marketplace_user?.id,
                    exclude_slug: this.slug
                };
                productApi.getProducts(params).then(res => {
                    if (!this.goodsOrganization.results) {
                        this.$store.dispatch('fetchDataByKey', { data: res, key: 'goodsOrganization' });
                    } else {
                        let goodsOrganization = this.goodsOrganization;
                        goodsOrganization.results = [...this.goodsOrganization.results, ...res.results];
                        goodsOrganization.count = res.count;
                        this.$store.dispatch('fetchDataByKey', { data: goodsOrganization, key: 'goodsOrganization' });
                    }
                    this.goodsOrganizationOffset = this.goodsOrganizationOffset + this.goodsOrganizationLimit;
                    this.goodsOrganizationTotal = res.count;
                    this.showLoaderSending.organization = false;
                }).catch(err => {
                    this.showLoaderSending.organization = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getCategoryGoods() {
                this.showLoaderSending.category = true;
                let params = {
                    limit: this.goodsCategoryLimit,
                    offset: this.goodsCategoryOffset,
                    category: this.good.category,
                    exclude_slug: this.slug
                };
                productApi.getProducts(params).then(res => {
                    if (!this.goodsCategory.results) {
                        this.$store.dispatch('fetchDataByKey', { data: res, key: 'goodsCategory' });
                    } else {
                        let goodsCategory = this.goodsCategory;
                        goodsCategory.results = [...this.goodsCategory.results, ...res.results];
                        goodsCategory.count = res.count;
                        this.$store.dispatch('fetchDataByKey', { data: goodsCategory, key: 'goodsCategory' });
                    }
                    this.goodsCategoryOffset = this.goodsCategoryOffset + this.goodsCategoryLimit;
                    this.goodsCategoryTotal = res.count;
                    this.showLoaderSending.category = false;
                }).catch(err => {
                    this.showLoaderSending.category = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            startChat(userId) {
                let params = {
                    // good: this.good.id,
                    marketplace_user: userId
                }
                chatApi.getChatByTypeAndOrganization('product', params).then(res => {
                    // this.chatPartner = res.chat_partner.id;
                    console.log(res);
                    this.$router.push({ name: 'chat', query: { chatId: res.id }, hash: '#product' });
                }).catch(err => {
                    console.error(err);
                });
            },
            toggleFavorite() {
                this.good.organization.is_favorite = !this.good.organization.is_favorite;
                cabinet.switchFavoriteOrganization(this.good.organization.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            requestGood() {
                this.showRequestGoodModal = true;
            },
            hideRequestGoodModal(updateData) {
                this.showRequestGoodModal = false;
                if (updateData) {
                    this.getGood();
                    //this.$emit('getTenderData');
                }
            },
            hidePhotoGoodModal() {
                this.showPhotoGoodModal = false;
            },
            scrollTo(ref) {
                if (this.$refs[ref]) this.$refs[ref].scrollIntoView({ behavior: "smooth" });
            },
            changeCurrentPhoto(index) {
                this.currentPhoto = index;
            }
        },
    }
</script>
