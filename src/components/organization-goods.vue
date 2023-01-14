<template>
    <div
        :class="blockClass" 
        class="goods"
    >
        <div class="goods__title">
            Загруженные товары <span>(105)</span>
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

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-1.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-2.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-3.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-3.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-3.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-3.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo">
                    <div class="goods__item-photo-inner">
                        <img src="../assets/img/temp/good-3.png" alt="">
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>
        </div>
        <div
            class="goods__pagination"
        >
            <div class="goods__pagination-left">
                <div class="goods__pagination-count">
                    Товаров: <span>107</span>
                </div>
            </div>
            <div class="tenders__pagination-right">
                <div class="tenders__pagination-perpage">
                    <span>На страницу :</span>
                    <select
                        v-model="limit"
                        class="tenders__pagination-select"
                        name="limit"
                    >
                        <option
                            value="18"
                            selected="selected"
                        >
                            18 товаров
                        </option>
                        <option value="36">
                            36 товаров
                        </option>
                        <option value="54">
                            54 товара
                        </option>
                        <option value="72">
                            72 товара
                        </option>
                    </select>
                </div>
                <Pagination
                    :total="107"
                    :limit="Number(10)"
                    :currentPage="Number($route.query.page || 1)"
                    :query="$route.query"
                    :url="$route.path"
                />
            </div>
        </div>
        <button 
            class="button button-green"
            @click.prevent="onClickAddGood"
        >
            Добавить товар
        </button>
        <ModalAddGood
            v-if="showAddGoodModal"
            :tender="tender || {}"
            :goodId="good.is"
            :showModal="showAddGoodModal"
            @hideModal="hideAddGoodModal"
        />
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    import { user as userApi, tender as tenderApi } from "@/services"
    import ModalAddGood from '@/components/modal-add-good.vue';
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            ModalAddGood,
            Pagination,
        },
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            organization: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                limit: 18,
                goods: null,
                showAddGoodModal: false,
                showLoaderSending: false,
            }
        },
        computed: {
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        watch: {
            limit () {
                if (this.$route.query) {
                    this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) })
                }
                this.getTenders()
            },
            '$route.query.page': {
                handler() {
                    this.getGoods()
                },
            }
        },
        created() {
            // this.getInviteStatus();
        },
        methods: {
            getGoods() {
                console.log('getGoods');
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                userApi.getOrganizationProducts(this.organization.id, params).then(tenders => {
                    this.tenders = tenders
                    this.showLoaderSending = false;
                    console.log(tenders)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })

            },
            onClickAddGood(good) {
                this.good = good;
                this.showAddGoodModal = true;
            },
            hideAddGoodModal(updateData) {
                this.showAddGoodModal = false;
                if (updateData) {
                    this.getGoods();
                    //this.$emit('getTenderData');
                }
            },
        },
    };
</script>
