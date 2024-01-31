<template>
    <div 
        v-if="!accessMarket"
        class="app__main"
    >
        <div class="cabinet organization">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                        { name: 'Маркет', route: { name: 'market' } },
                    ]"
                />
                <blockHint
                    :slug="`403_market`"
                    classModifier="organization__hint m--mt"
                />
            </div>
        </div>        
    </div>
    <div 
        v-else-if="$route.name === 'market'"
        class="app__main"
    >
        <div 
            v-if="profile"
            class="cabinet organization"
        >
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                        { name: 'Маркет', route: { name: 'market' } },
                    ]"
                />
                <div class="organization__info">
                    <div class="organization__title h1">
                        {{ marketUser.name }}
                    </div>
                    <div class="organization__tabs tabs">
                        <button 
                            v-for="item in tabsItems"
                            :key="`tab-${item.name}`"
                            :class="['tabs__item', currentTabsItem === item.name && 'is-active']"
                            :disabled="item.disabled"
                            @click.prevent="changeTab(item.name)"
                        >
                            {{ item.label }}
                        </button>
                    </div>
                </div>
                <div 
                    v-if="currentTabsItem === 'public'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="market-public"
                    />
                    <MarketPublic
                        v-if="marketUser"
                        @getMyProfile="getMyProfile"
                        @updateData="updateData"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="market-public"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'goods'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="market-goods"
                    />
                    <MarketGoods
                        v-if="marketUser"
                        :marketUser="marketUser"
                        blockClass="m--block"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="market-goods"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'orders'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="market-orders"
                    />
                    <MarketOrders
                        v-if="marketUser"
                        :marketUser="marketUser"
                        blockClass="m--block"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="market-orders"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'settings'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="market-settings"
                    />
                    <MarketSettings
                        v-if="marketUser"
                        @updateData="updateData"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="market-settings"
                    />
                </div>
            </div>
        </div>
    </div>
    <router-view 
        v-else
        :key="`route-${$router.name}`"
    />
</template>

<script>
    import { user as api, cabinet } from "@/services";
    //import blockOrganization from '@/components/block-organization.vue';
    import blockContent from '@/components/block-content.vue';
    import blockHint from '@/components/block-hint.vue';
    import MarketGoods from '@/components/market-goods.vue';
    import MarketPublic from '@/components/forms/market-public.vue';
    import MarketOrders from '@/components/market-orders.vue';
    import MarketSettings from '@/components/forms/market-settings.vue';

    export default {
        components: {
            //blockOrganization,
            blockContent,
            blockHint,
            MarketGoods,
            MarketPublic,
            MarketOrders,
            MarketSettings,
        },
        data() {
            return {
                profile: undefined,
                contragents: [],
                contragent:{},
                marketUser: {},
                limitParticipation: 5,
                offsetParticipation: 0,
                limitCreated: 5,
                offsetCreated: 0,
                tenders: null,
                countCreatedTenders: 0,
                countParticipationTenders: 0,
                tabsItems: [{
                    label: 'Публичный профиль',
                    name: 'public',
                    disabled: (!this.$store.state.user.is_access_product && this.$store.state.user.im_auth_type === 'organization')
                }, {
                    label: 'Товары',
                    name: 'goods'
                }, {
                    label: 'Заказы',
                    name: 'orders',
                    //disabled: true,
                }, {
                    label: 'Настройки',
                    name: 'settings',
                    //disabled: true,
                }],
                currentTabsItem: this.$route.hash?.replace('#', '') || 'public',
                loading: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user ? this.$store.state.user : "";
            },
            accessMarket() {
                if (this.user.im_auth_type !== 'organization' || this.user.is_master) return true;
                if (this.user.is_master || this.user.is_access_product) return true;
                return false;
            }
        },
        watch: {
            '$route.hash': {
                immediate: true,
                handler() {
                    this.currentTabsItem = this.$route.hash?.replace('#', '') || 'public';
                },
            },
        },
        created() {
            this.getMyProfile();
        },
        methods: {
            getMyProfile() {
                this.loading = true;
                cabinet.getMyProfile().then(res => {
                    this.profile = res;
                    this.marketUser = res.marketplace_user || {};
                    this.$store.dispatch('setMeta', {});
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    console.error(err);
                });
            },
            onClickEditOrganization() {
                this.$router.push({ name: 'organization-edit'});
            },
            updateData(data) {
                this.marketUser = data.marketplace_user || {};
            },
            changeTab(name) {
                this.currentTabsItem = name;
                this.$router.push({ name: this.$route.name, hash: `#${name}` });
            },
        }
    }
</script>