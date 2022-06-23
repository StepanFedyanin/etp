<template>
    <div class="app__main">
        <Breadcrumbs />
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
                    <h2 class="cabinet__subtitle h2">
                        Информация о компании
                    </h2>

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
                    <h2 class="cabinet__subtitle h2">
                        Представители организации
                    </h2>
                    <div class="cabinet__block cabinet__persons">
                        <blockPersons 
                            :user="profile"
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
            blockPersons,
            // ProfileOrganizationEdit
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
                // organizationId: this.$store.organization.id,
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
                    // console.log(res.organization);
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
            onClickEditOrganization() {
                this.$router.push({ name: 'organization-edit'});
            }
        }
    }
</script>
