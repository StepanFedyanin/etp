<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet">
            <div class="container">
                <div class="cabinet__content text">
                    <h1>Сотрудник организации</h1>
                    <ProfileUser
                        v-if="profile"
                        :user="profile"
                    />
                    <h2 class="cabinet__subtitle">
                        Информация о компании
                    </h2>
                    <div class="cabinet__block">
                        <blockOrganization 
                            :blockClass="contragent__organization"
                            :organization="organization"
                        />
                    </div>
                    <h2 class="cabinet__subtitle">
                        Представители организации
                    </h2>
                    <div class="cabinet__block cabinet__persons">
                        <blockPersons 
                            :blockClass="contragent__persons"
                            :persons="persons"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfileUser from '@/components/profile-user.vue';
    import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            ProfileUser,
            blockOrganization,
            blockPersons
        },
        data() {
            return {
                profile: undefined,
                // user: {
                //     id: 1,
                //     contact_email: 'golyasova@flexites.org',
                //     email: this.profile,
                //     first_name: 'Elena',
                //     last_name: 'Golyasova',
                //     organization: {
                //         id: 1,
                //         name: 'ООО “Флексайтс”',
                //         city: 'г. Челябинск',
                //         activity: 'Разработка компьютерного программного обеспечения',
                //         customer: '113',
                //         member: '45'
                //     },
                // },
                contragents: [],
                contragent: {
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                },
                organization: {},
                persons: [{
                    id: 1,
                    name: 'Жуков Николай Геннадьевич',
                    post: 'Директор',
                    email: 'info@flexites.org',
                    phone: '+7 (351) 267-29-94'
                }, {
                    id: 2,
                    name: 'Меренков Антон Антонович',
                    post: 'Менеджер',
                    email: 'mav@flexites.org',
                    phone: '+7 (351) 267-29-95'
                }, {
                    id: 3,
                    name: 'Некрасов Иван Иванович',
                    post: 'Менеджер',
                    email: 'nekrasov@flexites.org',
                    phone: '+7 (351) 267-29-95'
                }],
                tenders: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            api.getMyProfile().then(res => {
                console.log(res);
                this.profile = res;
                if(this.organization){
                    this.organization = res.organization;
                    console.log(res.organization);
                }
            }).catch(err => {
                // this.showLoaderSending = false;
                // this.$store.dispatch('showError', err);
                console.error(err);
            });
            console.log(this.formData);
        },
        methods: {
        }
    };
</script>
