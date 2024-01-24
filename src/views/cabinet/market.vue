<template>
    <div 
        v-if="$route.name === 'market'"
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
    import MarketGoods from '@/components/market-goods.vue';
    import MarketPublic from '@/components/forms/market-public.vue';
    import MarketOrders from '@/components/market-orders.vue';
    import MarketSettings from '@/components/forms/market-settings.vue';

    export default {
        components: {
            //blockOrganization,
            MarketGoods,
            MarketPublic,
            MarketOrders,
            MarketSettings,
            blockContent
        },
        data() {
            return {
                profile: undefined,
                contragents: [],
                contragent:{},
                marketUser: {},
                //participationTenders: {},
                //createdTenders: {},
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
                    disabled: !this.$store.state.user.is_access_product
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
                    //this.getCreatedTenders();
                    //this.getParticipationTenders();
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
            /*
            getParticipationTenders(){
                api.getParticipationTenders(this.organization.id, {limit: this.limit, offset: this.offsetParticipation}).then(res =>{
                    if(this.offsetParticipation===0){
                        this.participationTenders = res || {};
                    }else if(this.participationTenders.results){
                        this.participationTenders = {...this.participationTenders, ...res, results: [...this.participationTenders.results, ...res.results]}
                    }
                    this.offsetParticipation += 5;
                    this.countParticipationTenders = this.participationTenders.results.length;
                });
            },
            getCreatedTenders(){
                api.getCreatedTenders(this.organization.id, {limit: this.limit, offset: this.offsetCreated}).then(res =>{
                    if(this.offsetCreated===0){
                        this.createdTenders = res || {};
                    }else if(this.createdTenders.results){
                        this.createdTenders = {...this.createdTenders, ...res, results: [...this.createdTenders.results, ...res.results]}
                    }
                    this.offsetCreated += 5;
                    this.countCreatedTenders = this.createdTenders.results.length;
                });
            },
            */
            changeTab(name) {
                this.currentTabsItem = name;
                this.$router.push({ name: this.$route.name, hash: `#${name}` });
            },
        }
    }
</script>