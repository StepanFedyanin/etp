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
    import ProfileEdit from '@/components/forms/profile-edit.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            ProfileEdit,
        },
        props: {
            id: {
                type: Number,
                default() { return null; }
            },
        },
        data() {
            return {
                profile: undefined,
                organization: {},
                item: [],
            }
        },
        created() {
            console.log(this.id);
            api.getProfile(this.id).then(res => {
                this.profile = res;
                console.log(this.profile);
                this.$store.dispatch('setUser', res);
                if(this.organization) {
                    this.organization = res.organization;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        methods: {
        }
    }
</script>