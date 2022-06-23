<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet">
            <div class="container">
                <div class="sidebar__menu-link" @click="onClickProfile">Мой профиль</div>
                <div class="sidebar__menu-link" @click="onClickOrganization">Моя организация</div>
                <!-- <CabinetProfile /> -->
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
                // user: {
                //     id: 1,
                //     contact_email: 'golyasova@flexites.org',
                //     email: this.email,
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
                persons: [],
                tenders: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickProfile() {
                this.$router.push({ name: 'profile'});
            },
            onClickOrganization(){
                this.$router.push({ name: 'organization'})
            }
        }
    };
</script>
