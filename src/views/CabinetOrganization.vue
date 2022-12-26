<template>
    <div class="app__main">
        <div 
            v-if=" profile"
            class="cabinet organization"
        >
            <div class="container">
                <div class="organization__info">
                    <div class="organization__title h1">
                        {{ organization.name }}
                    </div>
                    <div class="organization__tabs">
                        <button 
                            v-for="item in tabsItems"
                            :key="`tab-${item.name}`"
                            class="button organization__tabs-item button-width-auto"
                            :class="currentTabsItem === item.name && 'is-active'"
                            @click.prevent="changeTab(item.name)"
                        >
                            {{ item.label }}
                        </button>
                    </div>
                    <!--
                    <div class="organization__subtitle h2">
                        Информация о компании
                    </div>
                    <svg 
                        v-if=" profile.is_staff || profile.is_master && profile.organization.id == $store._state.data.user.organization.id"
                        class="svg-icon svg-icon__edit"
                        @click="onClickEditOrganization()"
                    >
                        <use xlink:href="../assets/img/icons/icons.svg#edit" />
                    </svg>
                    -->
                </div>
                <div 
                    v-if="currentTabsItem === 'public'"
                    class="organization__tab"
                >
                    <div class="organization__content">
                        Ваш профиль виден всем по ссылке:
                        <router-link
                            :to="{ name: 'contragent', params: { id: organization.id } }"
                            v-slot="{ href, navigate }"
                        >
                            <a 
                                :href="href"
                                target="_blank"
                                @click="navigate"
                            >
                                {{ selfPath }}{{ href }}
                            </a>
                        </router-link>
                    </div>
                    <OrganizationPublic
                        v-if="organization"
                        :loading="loading"
                        :organization="organization"
                        @getMyProfile="getMyProfile"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'props'"
                    class="organization__tab"
                >
                    <OrganizationProps
                        v-if="organization"
                        :organization="organization"
                    />
                </div>
                <div 
                    v-if="currentTabsItem === 'persons'"
                    class="organization__tab"
                >
                    <!--
                    <h2 class="organization__subtitle h2">
                        Представители организации
                    </h2>
                    <svg 
                        v-if=" profile.is_staff || profile.is_master && profile.organization.id == $store._state.data.user.organization.id"
                        class="svg-icon svg-icon__addPerson"
                        @click="onClickAddStaff()"
                    >
                        <use xlink:href="../assets/img/icons/icons.svg#addPerson" />
                    </svg>
                    -->
                    <div class="organization__persons">
                        <blockPersons 
                            :organization="organization"
                            :persons="persons"
                            @updated="getMembers"
                        />
                    </div>
                    <button
                        v-if=" profile.is_staff || profile.is_master && profile.organization.id == $store._state.data.user.organization.id"
                        class="button button-green"
                        @click="onClickAddStaff()"
                    >
                        Добавить сотрудника
                    </button>
                    <div class="organization__tab-content text">
                        <p>Вы можете добавлять новых сотрудников (представителей компании), редактировать и деактивировать их.</p>
                        <p>Каждый сотрудник будет иметь собственную учетную запись для входа на платформу TUGAN.</p>
                        <p>Список сотрудников виден только зарегистрированным участникам платформы.</p>
                    </div>
                </div>
                <div 
                    v-if="currentTabsItem === 'tenders'"
                    class="organization__tab"
                >
                    <div class="contragent__subtitle h2">
                        Заказчик <span class="m--color-green">{{ createdTenders.count }} {{ getNoun(createdTenders.count) }}</span>
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
                        Участник <span class="m--color-green">{{ participationTenders.count }} {{ getNoun(participationTenders.count) }}</span>
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
    import { selfPath } from '@/settings'
    import { user as api } from "@/services";
    //import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import OrganizationPublic from '@/components/forms/organization-public.vue';
    import OrganizationProps from '@/components/forms/organization-props.vue';

    export default {
        components: {
            //blockOrganization,
            blockPersons,
            blockTenderMini,
            OrganizationPublic,
            OrganizationProps,
        },
        data() {
            return {
                selfPath,
                profile: undefined,
                contragents: [],
                contragent:{},
                organization: {},
                organizationid: {},
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
                tabsItems: [{
                    label: 'Публичный профиль',
                    name: 'public'
                /*
                }, {
                    label: 'Виды деятельности',
                    name: 'activities'
                }, {
                    label: 'Товары',
                    name: 'goods'
                */
                }, {
                    label: 'Реквизиты',
                    name: 'props'
                }, {
                    label: 'Сотрудники',
                    name: 'persons'
                }],
                currentTabsItem: 'public',
                loading: false
            }
        },
        created() {
            this.getMyProfile();
            /*
            api.getMyOrganizationMembers().then(res => {
                this.persons = res;
            }).catch(err => {
                console.error(err);
            });
            */
            this.getMembers();
        },
        methods: {
            getMyProfile(){
                this.loading = true;
                api.getMyProfile().then(res => {
                    this.profile = res;
                    this.organization = res.organization;
                    this.getCreatedTenders();
                    this.getParticipationTenders();
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    console.error(err);
                });
            },
            onClickEditOrganization(){
                this.$router.push({ name: 'organization-edit'});
            },
            onClickAddStaff(){
                this.$router.push({ name: 'organization-add-person'});
            },
            getMembers() {
                api.getMyOrganizationMembers().then(res => {
                    this.persons = res;
                }).catch(err => {
                    console.error(err);
                });
            },
            getParticipationTenders(){
                api.getParticipationTenders(this.organization.id, {limit: this.limit, offset: this.offsetParticipation}).then(res =>{
                    if(this.offsetParticipation===0){
                        this.participationTenders = res;
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
                        this.createdTenders = res;
                    }else if(this.createdTenders.results){
                        this.createdTenders = {...this.createdTenders, ...res, results: [...this.createdTenders.results, ...res.results]}
                    }
                    this.offsetCreated += 5;
                    this.countCreatedTenders = this.createdTenders.results.length;
                });
            },
            changeTab(name) {
                this.currentTabsItem = name;
            },
            getNoun(number) {
                let n = Math.abs(number);
                n %= 100;
                if (n === 0 || n >= 2 && n <= 20) {
                    return "тендеров";
                }
                n %= 10;
                if (n === 1) {
                    return "тендера";
                }
                return "тендеров";
            }
        }
    }
</script>