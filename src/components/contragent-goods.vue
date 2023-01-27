<template>
    <div
        v-if="goods && goodsTotal" 
        :class="blockClass" 
        class="goods"
    >
        <div
            class="goods__title h2 m--padding-top"
        >
            Товары и услуги <span class="m--color-green">({{ goodsTotal }})</span>
        </div>
        <div class="goods__block">
            <blockGoodsItem
                v-for="item in goods"
                :key="`good-${item.id}`"
                :good="item"
                :showCategory="true"
                :showOrganization="false"
            />
        </div>
        <template
            v-if="showLoaderSending"
        >
            <div class="good__loader loader">
                <div class="spinner" /> Загрузка данных о товарах организации
            </div>
        </template>
        <template
            v-else
        >
            <button 
                v-if="goodsTotal > goods.length"
                class="button button-outline-green goods__more"
                @click.prevent="getGoods()"
            >
                показать еще
            </button>
        </template>
    </div>
</template>

<script>
    //import { urlPath } from '@/settings'
    import { user as userApi, product as productApi } from "@/services"
    import blockGoodsItem from '@/components/block-goods-item.vue';
    //import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            blockGoodsItem,
            //Pagination,
        },
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            contragent: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                slug: null,
                goods: null,
                goodsTotal: null,
                goodsLimit: 18,
                goodsOffset: 0,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
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
                let params = {
                    limit: this.goodsLimit,
                    offset: this.goodsOffset,
                };
                this.showLoaderSending = true;
                userApi.getOrganizationProducts(this.contragent.id, params).then(res => {
                    if (!this.goods) {
                        this.goods = res.results;
                    } else {
                        this.goods = [...this.goods, ...res.results];
                    }
                    this.goodsOffset = this.goodsOffset + this.goodsLimit;
                    this.goodsTotal = res.count;
                    this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })

            },
        },
    };
</script>
