<template>
    <div class="app__main">
        <div class="good">
            <div class="container">
                <div 
                    class="good__title h1"
                >
                    Портландцемент ПЦТ I-50 ГОСТ 1581-96
                </div>
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
                    <div class="good__block">
                        <div class="good__block-left">
                            <div class="good__params">
                                <div class="good__param">
                                    <div class="good__param-name">Поставщик</div>
                                    <div class="good__param-data">ООО “ЕЦЗ”</div>
                                </div>

                                <div class="good__param">
                                    <div class="good__param-name">Единица измерения</div>
                                    <div class="good__param-data">Мешок 50кг</div>
                                </div>

                                <div class="good__param">
                                    <div class="good__param-name">Дата обновления</div>
                                    <div class="good__param-data">30.11.2022</div>
                                </div>

                                <div class="good__param">
                                    <div class="good__param-name">Код позиции ЭТП</div>
                                    <div class="good__param-data">A-12-35120</div>
                                </div>
                            </div> 

                            <div class="good__block-info">
                                <div class="good__block-title">О товаре</div>
                                <div class="good__block-content">
                                    <p>Портландцемент и другие товары можно приобрести в Леруа Мерлен в Челябинске по низким ценам. Подберите интересующий товар на сайте и купите его в нашем интернет-магазине. Ассортимент товаров, представленных в каталоге, чрезвычайно широк. Среди них наверняка найдется подходящая по всем параметрам позиция.</p>
                                    <p>Все представленные в разделе «Портландцемент» изделия выпускаются известными и отлично зарекомендовавшими себя высоким качеством своей продукции компаниями.</p>
                                </div>
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
                            :contragent="contragent"
                            @toggleFavorite="toggleFavorite"
                        />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    //import { category as api } from "@/services"
    import { user as api } from "@/services";
    import blockContragent from '@/components/block-contragent.vue';

    export default {
        name: 'Product',
        components: {
            blockContragent
        },
        data() {
            return {
                good: {},
                contragent: {},
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        mounted() {
            this.getOrganization();
        },
        methods: {
            getProduct() {
            },
            getOrganization() {
                this.showLoaderSending = true;
                api.getOrganization(48).then(res => {
                    this.contragent = res;
                    //this.$helpers.setDocumentTitle(this.contragent);
                    //this.$helpers.setDocumentMeta(this.contragent);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                });
            },
            toggleFavorite() {
                this.contragent.is_favorite = !this.contragent.is_favorite;
                api.switchFavoriteOrganization(this.contragent.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        },
    }
</script>
