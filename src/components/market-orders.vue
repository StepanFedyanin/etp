<template>
    <div class="organization__orders orders">
        <div class="h3">Роль в заказе</div>
        <div class="orders__tabs tabs">
            <button 
                v-for="item in tabsItems"
                :key="`tab-${item.name}`"
                :class="['tabs__item m--no-border', currentTabsItem === item.name && 'is-active']"
                :disabled="item.disabled"
                @click.prevent="changeTab(item.name)"
            >
                {{ item.label }}
            </button>
        </div>
        <template v-if="showLoaderSending">
            <div class="orders__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else-if="orders && count">
            <div v-if="count > limit" class="orders__pagination">
                <Pagination
                    :total="count"
                    :limit="limit"
                    :currentPage="Number($route.query.page || 1)"
                    :query="$route.query"
                    :hash="$route.hash"
                    :url="$route.path"
                />
            </div>
            <div class="orders__block">
                <div :class="['orders__item m--header', !showMore && 'm--short']">
                    <div class="orders__item-inner">
                        <div v-if="showMore" class="orders__item-cell" />
                        <div class="orders__item-cell">
                            Дата / №
                        </div>
                        <div class="orders__item-cell">
                            Заказ
                        </div>
                        <div class="orders__item-cell">
                            {{ currentTabsItem === 'seller' ? 'Покупатель' : 'Продавец' }}
                        </div>
                    </div>
                </div>
                <blockOrdersItem 
                    v-for="item in orders"
                    :key="`order-${item.id}`"
                    :order="item"
                    :type="currentTabsItem"
                    @updateData="getProductOrders"
                />
            </div>
            <div v-if="count > limit" class="orders__pagination">
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
                В данный момент у вас нет заявок
            </div> 
        </template>
    </div>
</template>

<script>
    //import { urlPath } from '@/settings'
    import { cabinet } from '@/services'
    import blockOrdersItem from '@/components/block-orders-item.vue';
    import Pagination from '@/components/pagination.vue';

    export default {
        components: {
            blockOrdersItem,
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
                tabsItems: [{
                    label: 'Я — продавец',
                    name: 'seller',
                }, {
                    label: 'Я — покупатель',
                    name: 'buyer'
                }],
                currentTabsItem: 'seller',
                limit: 10,
                orders: null,
                count: null,
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
            },
            showMore() {
                return true;
                //return (this.organization?.id == this.user.organization?.id);
            },
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
                    this.getProductOrders()
                },
            }
        },
        created() {
        },
        mounted() {
            this.getProductOrders()
        },
        methods: {
            getProductOrders() {
                let params = {
                    limit: +this.limit,
                    offset: +this.offset
                };
                if (this.currentTabsItem === 'seller') params.is_seller = true;
                if (this.currentTabsItem === 'buyer') params.is_buyer = true;
                this.showLoaderSending = true;
                cabinet.getProductOrders(params).then(res => {
                    this.orders = res.results.map((item) => {
                        item.product_json = item.product_json ? JSON.parse(item.product_json) : {};
                        return item;
                    });
                    this.count = res.count;
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            onClickAddStaff() {
                this.$router.push({ name: 'organization-person-add'});
            },
            changeTab(name) {
                this.currentTabsItem = name;
                if (+this.$route.query.page !== 1) {
                    this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }), hash: this.$route.hash });
                } else {
                    this.getProductOrders();
                }
            },
        },
    };
</script>
