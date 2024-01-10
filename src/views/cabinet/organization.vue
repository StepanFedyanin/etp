<template>
    <div class="app__main">
        <div 
            v-if="profile"
            class="cabinet organization"
        >
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <div class="organization__info">
                    <div class="organization__title h1">
                        {{ organization.name }}
                    </div>
                    <div class="organization__tabs tabs">
                        <button 
                            v-for="item in tabsItems"
                            :key="`tab-${item.name}`"
                            class="tabs__item"
                            :class="currentTabsItem === item.name && 'is-active'"
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
                        name="organization-public"
                    />
                    <OrganizationPublic
                        v-if="organization"
                        :loading="loading"
                        :organization="organization"
                        @getMyProfile="getMyProfile"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="organization-public"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'props'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="organization-props"
                    />
                    <OrganizationProps
                        v-if="organization"
                        :organization="organization"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="organization-props"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'persons'"
                    class="organization__tab"
                >
                    <blockContent
                        classModifier="m--top"
                        place="top"
                        name="organization-persons"
                    />
                    <OrganizationPersons
                        v-if="organization"
                        :organization="organization"
                    />
                    <blockContent
                        classModifier="m--bottom"
                        place="bottom"
                        name="organization-persons"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'tenders'"
                    class="organization__tab"
                >
                    <div class="contragent__subtitle h2">
                        Заказчик <span class="m--color-green">{{ $helpers.stringForNumber(createdTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
                    </div>
                    <div class="contragent__tenders tenders">
                        <blockTenderMini
                            v-for="(tender, index) in createdTenders.results"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :whole="true"
                        />

                        <button 
                            v-if="createdTenders.count > countCreatedTenders"
                            class="button button-outline-green tenders__more"
                            @click="getCreatedTenders()"
                        >
                            показать еще
                        </button>
                    </div>
                    <div class="contragent__subtitle h2">
                        Участник <span class="m--color-green">{{ $helpers.stringForNumber(participationTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
                    </div>
                    <div class="contragent__tenders tenders">
                        <blockTenderMini
                            v-for="(tender, index) in participationTenders.results"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :whole="true"
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
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api, cabinet } from "@/services";
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import blockContent from '@/components/block-content.vue';
    import OrganizationPublic from '@/components/forms/organization-public.vue';
    import OrganizationProps from '@/components/forms/organization-props.vue';
    import OrganizationPersons from '@/components/organization-persons.vue';

    export default {
        components: {
            OrganizationPersons,
            OrganizationPublic,
            OrganizationProps,
            blockTenderMini,
            blockContent
        },
        data() {
            return {
                profile: undefined,
                contragents: [],
                contragent:{},
                organization: {},
                organizationid: {},
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
                    name: 'public'
                /*
                }, {
                    label: 'Виды деятельности',
                    name: 'activities'
                */
                }, {
                    label: 'Реквизиты',
                    name: 'props'
                }, {
                    label: 'Сотрудники',
                    name: 'persons'
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
                    this.organization = res.organization || {};
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