<template>
    <div :class="['goods', blockClass]">
        <div class="goods__title h2">
            Загруженные товары <span>({{ count || 0 }})</span>
            <router-link 
                :to="{ name: 'market-good-add' }"
                class="goods__title-more"
            >
                <span class="m--plus">Добавить товар</span>
            </router-link>
        </div>
        <template v-if="showLoaderSending">
            <div class="goods__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else-if="goods && count">    
            <div v-if="count > limit" class="goods__pagination">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :query="$route.query"
                    :hash="$route.hash"
                    :url="$route.path"
                />
            </div>
            <div class="goods__block">
                <blockGoodsItem
                    v-for="item in goods"
                    :key="`good-${item.id}`"
                    :good="item"
                    :showCategory="true"
                    :showControl="user.is_access_product"
                    @deleteGood="deleteGood"
                />
            </div>
            <div v-if="count > limit" class="goods__pagination">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :query="$route.query"
                    :hash="$route.hash"
                    :url="$route.path"
                />
            </div>
        </template>
        <template v-else>
            <div class="tenders__empty">
                В данный момент у вас нет ни одного товара
            </div> 
        </template>
        <!--ModalAddGood
            v-if="showAddGoodModal"
            :slug="slug"
            :showModal="showAddGoodModal"
            @hideModal="hideAddGoodModal"
        /-->
    </div>
</template>

<script>
    //import { urlPath } from '@/settings'
    import { cabinet } from "@/services"
    import blockGoodsItem from '@/components/block-goods-item.vue';
    //import ModalAddGood from '@/components/modals/good-add.vue';
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            blockGoodsItem,
            //ModalAddGood,
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
                limit: 16,
                slug: null,
                goods: null,
                count: null,
                //showAddGoodModal: false,
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
        },
        mounted() {
            this.getGoods();
        },
        methods: {
            getGoods() {
                let params = {
                    limit: +this.limit,
                    offset: +this.offset
                };
                this.showLoaderSending = true;
                cabinet.getProducts(params).then(res => {
                    this.goods = res.results;
                    this.count = res.count;
                    this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })

            },
            deleteGood(slug) {
                cabinet.deleteProduct(slug).then(res => {
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
