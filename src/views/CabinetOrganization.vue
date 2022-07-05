<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet organization">
            <div class="container">
                <div 
                    v-if=" profile"
                    class="organization__info"
                >
                    <div class="organization__title h1">
                        {{ organization.name }}
                    </div>
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
                    <div class="cabinet__block">
                        <blockOrganization 
                            :organization="organization"
                        />
                    </div>
                </div>
                <h2 class="organization__subtitle h2">
                    Представители организации
                </h2>
                <div class="cabinet__block cabinet__persons">
                    <blockPersons 
                        :user="profile"
                        :persons="persons"
                        @updated="getMembers"
                    />
                </div>
                <div class="contragent__subtitle h2">
                    Заказчик <span class="m--color-green">{{ createdTenders.count }} тендеров</span>
                </div>
                <div class="contragent__tenders tenders">
                    <blockTenderMini
                        v-for="(tender, index) in createdTenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />

                    <a 
                        class="button button-outline-green tenders__more"
                        href="#"
                        @click="getCreatedTenders()"
                    >
                        показать еще
                    </a>
                </div>
                <div class="contragent__subtitle h2">
                    Участник <span class="m--color-green">{{ participationTenders.count }} тендер</span>
                </div>
                <div class="contragent__tenders tenders">
                    <blockTenderMini
                        v-for="(tender, index) in participationTenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />

                    <a 
                        class="button button-outline-green tenders__more"
                        href="#"
                        @click="getParticipationTenders()"
                    >
                        показать еще
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            blockOrganization,
            blockPersons,
            blockTenderMini,
        },
        // props: {
        //     id: {
        //         type: String,
        //         default() { return null; }
        //     },
        // },
        data() {
            return {
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
            }
        },
        created() {
            this.getMyProfile();
            api.getMyOrganizationMembers().then(res => {
                this.persons = res;
            }).catch(err => {
                console.error(err);
            });
            this.getMembers();
            // this.getParticipationTenders();
            // this.getCreatedTenders();
        },
        methods: {
            getMyProfile(){
                api.getMyProfile().then(res => {
                    this.profile = res;
                    this.organization = res.organization;
                    this.getCreatedTenders(this.organization);
                    this.getParticipationTenders(this.organization);

                    if(this.organization){
                        console.log(this.organization.id);
                    }
                }).catch(err => {
                    console.error(err);
                });
            },
            onClickEditOrganization(){
                this.$router.push({ name: 'organization-edit'});
            },
            getMembers() {
                api.getMyOrganizationMembers().then(res => {
                    this.persons = res;

                }).catch(err => {
                    console.error(err);
                });
            },
            getParticipationTenders(){
                console.log(this.organization);
                api.getParticipationTenders(this.organization.id, {limit: this.limit, offset: this.offsetParticipation}).then(res =>{
                    if(this.offsetParticipation===0){
                        this.participationTenders = res;
                    }else if(this.participationTenders.results){
                        this.participationTenders = {...this.participationTenders, ...res, results: [...this.participationTenders.results, ...res.results]}
                    }
                    this.offsetParticipation += 5;
                    console.log(this.offsetParticipation);
                });
            },
            getCreatedTenders(){
                // this.organization = this.getMyProfile();
                // console.log(this.organization);
                api.getCreatedTenders(this.organization.id, {limit: this.limit, offset: this.offsetCreated}).then(res =>{
                    if(this.offsetCreated===0){
                        this.createdTenders = res;
                    }else if(this.createdTenders.results){
                        this.createdTenders = {...this.createdTenders, ...res, results: [...this.createdTenders.results, ...res.results]}
                    }
                    this.offsetCreated += 5;
                    console.log(this.offsetCreated);
                });
            },
        }
    }
</script>