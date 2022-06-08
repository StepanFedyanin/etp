<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet">
            <div class="container">
                <div class="11">
                    Кабинет в разработке
                </div>
                <!-- <CabinetProfile /> -->
                <!-- <div class="cabinet__content text">
                    <h1>Сотрудник организации</h1>

                    <div>{{ user.email }}</div>

                    <ProfileUser />
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
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    // import CabinetProfile from '@/components/cabinetProfile.vue';
    // import blockOrganization from '@/components/block-organization.vue';
    // import blockPersons from '@/components/block-persons.vue';
    // import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            // CabinetProfile,
            // blockOrganization,
            // blockPersons
        },
        data() {
            return {
                user: {
                    id: 1,
                    contact_email: 'golyasova@flexites.org',
                    email: this.email,
                    first_name: 'Elena',
                    last_name: 'Golyasova',
                    organization: {
                        id: 1,
                        name: 'ООО “Флексайтс”',
                        city: 'г. Челябинск',
                        activity: 'Разработка компьютерного программного обеспечения',
                        customer: '113',
                        member: '45'
                    },
                },
                contragents: [],
                url: {
                    hashtags: 'https://dka-develop.ru/api?type=hashtag',
                    contragents: 'http://tugan-app.flexidev.ru/user/organization/',
                    persons:''
                },
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
            // console.log(this.formData);
            // let params = this.formData;
            // api.getMyProfile(params).then(res => {
            //     console.log(res);

            //     // user.email = res.email;
            //     this.email = res.email;
            //     console.log(this.email);
            //     this.organization = res.organization;
            //     this.formData = {
            //         organization: res.id
            //     }
            //     // this.showLoaderSending = false;
            //     // this.$store.dispatch('setUser', res);
            //     // this.next();
            // }).catch(err => {
            //     // this.showLoaderSending = false;
            //     // this.$store.dispatch('showError', err);
            //     console.error(err);
            // });

            // console.log(this.formData);
            // // // let params = this.formData;

        },
        methods: {
            // onClickContragent(id) {
            //     this.$router.push({ name: 'contragent', params: { id: id } });
            // },

            // submitOrganizationHandler(data, node) {
            //     console.log(this.formData);
            //     let params = this.formData;
            //     this.regData.organization = Object.assign({}, this.formData);
            //     this.showLoaderSending = true;
            //     api.getOrganization(params).then(res => {
            //         this.showLoaderSending = false;
            //         console.log(res);
            //         this.regData.organization = res;
            //         this.formData = {
            //             organization: res.id
            //         }
            //         this.next();
            //     }).catch(err => {
            //         node.setErrors(
            //             [err.detail],
            //         );
            //         this.showLoaderSending = false;
            //         this.$store.dispatch('showError', err);
            //         console.error(err);
            //     });
            // },
        }
    };
</script>
