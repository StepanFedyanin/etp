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
                    <div class="cabinet__organization">
                        <blockOrganization 
                            :organization="organization"
                        />
                    </div>
                </div>
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
                <div class="cabinet__persons">
                    <blockPersons 
                        :user="profile"
                        :persons="persons"
                        @updated="getMembers"
                    />
                </div>
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
</template>

<script>
    import { user as api } from "@/services";
    import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';

    export default {
        components: {
            blockOrganization,
            blockPersons,
            blockTenderMini,
        },
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
                countCreatedTenders: 0,
                countParticipationTenders: 0,
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