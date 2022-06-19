<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet">
            <div class="container">
                <div class="profile-edit">
                    <h1 class="profile-edit__title h1">
                        Сотрудник организации
                    </h1>
                    <h2 class="profile-edit__subtitle h2">
                        Изменить данные профиля
                    </h2>
                    <ProfileEdit
                        v-if="profile"
                        :item="profile"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfileEdit from '@/components/profile-edit.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            ProfileEdit,
        },
        data() {
            return {
                profile: undefined,
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
                item: [],
            }
        },
        created() {
            api.getMyProfile().then(res => {
                this.profile = res;
                if(this.organization){
                    this.organization = res.organization;
                    // console.log(res.organization);
                }
            }).catch(err => {
                console.error(err);
            });
            // console.log(this.formData);
        },
        methods: {
        }
    }
</script>