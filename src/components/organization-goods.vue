<template>
    <div
        :class="blockClass" 
        class="goods"
    >
        <template
            v-if="showLoaderSending"
        >
            <div class="goods__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template
            v-else-if="goods && count"
        >    
            <div class="goods__title">
                Загруженные товары <span>({{ count }})</span>
            </div>
            <div class="goods__block">
                <blockGoodsItem
                    v-for="item in goods"
                    :key="`good-${item.id}`"
                    :good="item"
                    :showControl="true"
                    @addGood="addGood"
                    @deleteGood="deleteGood"
                />
            </div>
        </template>
        <template
            v-else
        >
            <div class="tenders__empty">
                В данный момент у вас нет ни одного товара
            </div> 
        </template>
        <div
            class="goods__pagination"
        >
            <div class="goods__pagination-left">
                <div class="goods__pagination-count">
                    Товаров: <span>{{ count }}</span>
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
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :query="$route.query"
                    :url="$route.path"
                />
            </div>
        </div>
        <button 
            class="button button-green"
            @click.prevent="addGood()"
        >
            Добавить товар
        </button>
        <ModalAddGood
            v-if="showAddGoodModal"
            :slug="slug"
            :showModal="showAddGoodModal"
            @hideModal="hideAddGoodModal"
        />
    </div>
</template>

<script>
    //import { urlPath } from '@/settings'
    import { user as userApi, product as productApi } from "@/services"
    import blockGoodsItem from '@/components/block-goods-item.vue';
    import ModalAddGood from '@/components/modal-add-good.vue';
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            blockGoodsItem,
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
                slug: null,
                goods: null,
                count: null,
                showAddGoodModal: false,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
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
                this.getGoods()
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
        mounted() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                console.log('getGoods');
                let limit = Number(this.limit)
                let params = {
                    organization: this.user.organization.id,
                    limit,
                    offset: this.offset
                };
                this.showLoaderSending = true;
                userApi.getOrganizationProducts(this.organization.id, params).then(res => {
                    this.goods = res.results;
                    this.count = res.count;
                    this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })

            },
            addGood(slug) {
                this.slug = slug;
                this.showAddGoodModal = true;
            },
            deleteGood(slug) {
                productApi.deleteProduct(slug).then(res => {
                    this.getGoods();
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.loading = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
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
