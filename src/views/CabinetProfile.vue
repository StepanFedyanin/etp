<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div 
                    v-if="profile"
                    class="cabinet__content"
                >
                    <h1 class="h1">
                        Сотрудник организации
                    </h1>
                    <ProfileUser
                        :user="profile"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfileUser from '@/components/profile-user.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            // Breadcrumbs,
            ProfileUser,
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
                persons: [],
                tenders: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            api.getMyProfile().then(res => {
                this.profile = res;
                this.$store.dispatch('setUser', res);
                if(this.organization) {
                    this.organization = res.organization;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        methods: {
            onClickEditOrganization() {
                this.$router.push({ name: 'organization-edit'});
            },
        }
    }
</script>
