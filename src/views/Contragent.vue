<template>
    <div class="app__main">
        <div :class="['cabinet contragent']">
            <div :class="['container']">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Организации', route: { name: 'contragents' } },
                    ]"
                />
                <template
                    v-if="showLoaderSending"
                >
                    <div class="contragent__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else
                >
                    <div class="contragent__title h1">
                        {{ contragent.name }}
                    </div>
                    <blockContragent 
                        :contragent="contragent"
                        @toggleFavorite="toggleFavorite"
                    />

                    <!--div class="contragent__block">
                        <blockOrganization 
                            :organization="contragent"
                        />
                    </div-->
                    <q-no-ssr>
                        <template v-if="user?.id && user.organization?.id">
                            <div class="h2">
                                Представители организации
                            </div>
                            <div class="contragent__block">
                                <blockPersons 
                                    :persons="persons"
                                    @updated="getMembers"
                                />
                            </div>
                        </template>
                    </q-no-ssr>
                    <ContragentGoods
                        :contragent="contragent"
                    />

                    <template
                        v-if="createdTenders.count"
                    >
                        <div class="h2">
                            Заказчик&nbsp;<span class="m--color-green">{{ $helpers.stringForNumber(createdTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
                        </div>
                        <div class="contragent__tenders tenders tenders__created">
                            <div class="tenders__block">
                                <blockTender
                                    v-for="(tender, index) in createdTenders.results"
                                    :key="`tender-${index}`"
                                    :tender="tender"
                                />
                                <button 
                                    v-if="createdTenders.count > countCreatedTenders"
                                    class="button button-outline-green tenders__more"
                                    @click="getCreatedTenders()"
                                >
                                    показать еще
                                </button>
                            </div>
                        </div>
                    </template>
                    <template
                        v-if="participationTenders.count"
                    >
                        <div class="h2">
                            Участник&nbsp;<span class="m--color-green">{{ $helpers.stringForNumber(participationTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
                        </div>
                        <div 
                            v-if="participationTenders && participationTenders.count"
                            class="contragent__tenders tenders participation__created"
                        >
                            <div class="tenders__block">
                                <blockTender
                                    v-for="(tender, index) in participationTenders.results"
                                    :key="`tender-${index}`"
                                    :tender="tender"
                                />
                                <button 
                                    v-if="participationTenders.count > countParticipationTenders"
                                    class="button button-outline-green tenders__more"
                                    @click="getParticipationTenders()"
                                >
                                    показать еще
                                </button>
                            </div>
                        </div>
                    </template>
                    <template
                        v-if="contragent.neighbouring_organizations && contragent.neighbouring_organizations.length"
                    >
                        <div class="h2">
                            Другие организации
                        </div>
                        <div class="contragent__siblings">
                            <router-link
                                v-for="item in contragent.neighbouring_organizations"
                                :key="`contragent-${item.id}`"
                                :to="{ name: 'contragent', params: { id: item.id } }"
                                class="contragent__siblings-item"
                            >
                                <div 
                                    class="contragent__siblings-item-logo"
                                    :class="item.logo ? '' : 'm--no-logo'"
                                >
                                    <img 
                                        v-if="item.logo"
                                        :src="item.logo" 
                                        :alt="item.name"
                                    >
                                </div>
                                <div class="contragent__siblings-item-name">
                                    {{ item.name }}    
                                </div>
                                <div class="contragent__siblings-item-city">
                                    {{ item.city }}    
                                </div>
                            </router-link>
                        </div>
                    </template>                
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import blockContragent from '@/components/block-contragent.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTender from '@/components/block-tender.vue';
    import ContragentGoods from '@/components/contragent-goods.vue';
    import { user as api, cabinet } from "@/services";

    export default {
        name: 'Contragent',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('Contragent preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            await api.getOrganization(currentRoute.params?.id).then(res => {
                let contragent = res;
                store.dispatch('setMeta', contragent);
                store.dispatch('fetchDataByKey', { data: contragent, key: 'contragent' });
            }).catch(err => {
                if (err.response.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
            blockContragent,
            blockPersons,
            blockTender,
            ContragentGoods
        },
        props: {
            id: {
                type: [String, Number],
                default() { return null; }
            },
        },
        data() {
            return {
                //contragent: {},
                persons: [],
                participationTenders: {},
                createdTenders: {},
                limitParticipation: 5,
                offsetParticipation: 0,
                limitCreated: 5,
                offsetCreated: 0,
                tenders: null,
                countCreatedTenders: 0,
                countParticipationTenders: 0,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            contragent() {
                return this.$store.state.data?.contragent || {};
            },
        },
        watch: {
            'id': {
                //immediate: true,
                handler() {
                    if (!process.env.SERVER) {
                        this.getOrganization();
                        this.getCreatedTenders();
                        this.getParticipationTenders();
                        this.getMembers();
                    }
                },
            }
        },
        created() {
        },
        mounted() {
            this.getOrganization();
            this.getCreatedTenders();
            this.getParticipationTenders();
            this.getMembers();
        },
        methods: {
            getOrganization() {
                this.showLoaderSending = true;
                api.getOrganization(this.id).then(res => {
                    let contragent = res;
                    this.$store.dispatch('fetchDataByKey', { data: contragent, key: 'contragent' });
                    this.$store.dispatch('setMeta', this.contragent);
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.$store.dispatch('setMeta', {});
                    if (err.response?.status === 404) this.$router.replace({ name: 'page404' });
                    this.showLoaderSending = false;
                });
            },
            getMembers() {
                if (this.user && this.user.id) {
                    api.getOrganizationMembers(this.id).then(res => {
                        this.persons = res;

                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
            getParticipationTenders() {
                api.getParticipationTenders(this.id, {limit: this.limit, offset: this.offsetParticipation}).then(res => {
                    if (this.offsetParticipation===0) {
                        this.participationTenders = res;
                    } else if (this.participationTenders.results) {
                        this.participationTenders = {...this.participationTenders, ...res, results: [...this.participationTenders.results, ...res.results]}
                    }
                    this.offsetParticipation += 5;
                    this.countParticipationTenders = this.participationTenders.results.length;
                });
            },
            getCreatedTenders() {
                api.getCreatedTenders(this.id, {limit: this.limit, offset: this.offsetCreated}).then(res => {
                    if(this.offsetCreated===0) {
                        this.createdTenders = res;
                    } else if (this.createdTenders.results) {
                        this.createdTenders = {...this.createdTenders, ...res, results: [...this.createdTenders.results, ...res.results]}
                    }
                    this.offsetCreated += 5;
                    this.countCreatedTenders = this.createdTenders.results.length;
                });
            },
            toggleFavorite() {
                this.contragent.is_favorite = !this.contragent.is_favorite;
                cabinet.switchFavoriteOrganization(this.contragent.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },

        }
    };
</script>
