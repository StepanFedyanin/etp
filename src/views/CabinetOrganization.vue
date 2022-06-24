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
                        :persons="persons"
                    />
                </div>
                <div class="contragent__subtitle h2">
                    Заказчик <span class="m--color-green">5 тендеров</span>
                </div>
                <div class="contragent__tenders tenders">
                    <blockTender
                        v-for="(tender, index) in tenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />

                    <a 
                        class="button button-outline-green tenders__more"
                        href="#"
                    >
                        показать все
                    </a>
                </div>
                <div class="contragent__subtitle h2">
                    Участник <span class="m--color-green">1 тендер</span>
                </div>
                <div class="contragent__tenders tenders">
                    <blockTender
                        v-for="(tender, index) in tenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />

                    <a 
                        class="button button-outline-green tenders__more"
                        href="#"
                    >
                        показать все
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
    import blockTender from '@/components/block-tender.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            blockOrganization,
            blockPersons,
            blockTender,
        },
        data() {
            return {
                profile: undefined,
                contragents: [],
                contragent:{},
                //  {
                //     id: 1,
                //     name: 'ООО “Флексайтс”',
                //     city: 'г. Челябинск',
                //     activity: 'Разработка компьютерного программного обеспечения',
                //     customer: '113',
                //     member: '45'
                // },
                organization: {},
                persons: [],
                tenders: [],
            }
        },
        created() {
            api.getMyProfile().then(res => {
                this.profile = res;
                // this.$store.dispatch('setUser', res);
                if(this.organization){
                    this.organization = res.organization;
                }
            }).catch(err => {
                console.error(err);
            });
            api.getMyOrganizationMembers().then(res => {
                this.persons = res;
            }).catch(err => {
                console.error(err);
            });
            
        },
        methods: {
            onClickEditOrganization(){
                this.$router.push({ name: 'organization-edit'});
            }
        }
    }
</script>