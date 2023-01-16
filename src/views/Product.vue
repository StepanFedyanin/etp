<template>
    <div class="app__main">
        <div class="good">
            <div class="container">
                <template
                    v-if="showLoaderSending"
                >
                    <div class="good__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="good"
                >
                    <div 
                        class="good__title h1"
                    >
                        {{ good.name }}
                    </div>
                    <div class="good__block">
                        <div class="good__block-left">
                            <div class="good__params">
                                <div class="good__param">
                                    <div class="good__param-name">
                                        Поставщик
                                    </div>
                                    <div class="good__param-data">
                                        {{ good.organization.name }}
                                    </div>
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
                                    <div class="good__param-name">Код позиции ЭТП</div>
                                    <div class="good__param-data">A-12-35120</div>
                                </div>
                            </div> 

                            <div class="good__block-info">
                                <div class="good__block-title">
                                    О товаре
                                </div>
                                <div 
                                    class="good__block-content"
                                    v-html="good.description"
                                />
                            </div>                           
                        </div>
                        <div class="good__block-right">
                            <div class="good__price">
                                <div class="good__price-value">50 000 ₽</div>
                                <button class="button button-green good__price-button">Отправить заявку</button>
                            </div>

                            <div class="good__photo m--no-photo">
                                <div class="good__photo-inner">
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="good__contragent contragent">
                        <div class="good__contragent-title">О поставщике</div>
                        <blockContragent 
                            :contragent="good.organization"
                            @toggleFavorite="toggleFavorite"
                        />
                    </div>

                    <div class="good__list goods">
                        <div class="goods__title">
                            Все товары поставщика <span>(105)</span>
                        </div>
                        <div class="goods__block">
                            <div class="goods__item">
                                <router-link
                                    :to="{ name: 'product', params: { slug: 'test' } }"
                                    class="goods__item-photo m--no-photo"
                                >
                                    <div class="goods__item-photo-inner">
                                        
                                    </div>
                                </router-link>
                                <div 
                                    class="goods__item-info"
                                >
                                    <div class="goods__item-price">123 006 000 ₽</div>
                                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное до немыслимых размеров</div>
                                </div>
                                <div class="goods__item-control">
                                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                                </div>
                            </div>
                        </div>
                        <button class="button button-outline-green goods__more">показать еще</button>
                    </div>

                    <div class="good__list goods">
                        <div class="goods__title">
                            Товары из категории «Банковские и финансовые услуги, кредит» <span>(105)</span>
                        </div>
                        <div class="goods__block">
                            <div class="goods__item">
                                <router-link
                                    :to="{ name: 'product', params: { slug: 'test' } }"
                                    class="goods__item-photo m--no-photo"
                                >
                                    <div class="goods__item-photo-inner">
                                        
                                    </div>
                                </router-link>
                                <div 
                                    class="goods__item-info"
                                >
                                    <div class="goods__item-price">123 006 000 ₽</div>
                                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное до немыслимых размеров</div>
                                </div>
                                <div class="goods__item-control">
                                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                                </div>
                            </div>
                        </div>
                        <button class="button button-outline-green goods__more">показать еще</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { user as api, product as productApi } from "@/services";
    import blockContragent from '@/components/block-contragent.vue';

    export default {
        name: 'Product',
        components: {
            blockContragent
        },
        props: {
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                good: {},
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
            this.getProduct();
        },
        methods: {
            getProduct() {
                this.showLoaderSending = true;
                let params = {
                };
                productApi.getProduct(this.slug, params).then(res => {
                    console.log(res);
                    this.good = res;
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.loading = false;
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
        },
    }
</script>
