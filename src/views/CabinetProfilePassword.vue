<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet">
            <div class="container"> 
                <h1 class="h1">
                    Сотрудник организации
                </h1>
                <ProfilePassword
                    :user="profile"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfilePassword from '@/components/profile-password.vue';
    // import { user as api } from "@/services";

    export default {
        components: {
            Breadcrumbs,
            ProfilePassword,
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
            // console.log(this.id);
            // api.getProfile(this.id).then(res => {
            //     this.profile = res;
            //     console.log(this.profile);
            //     this.$store.dispatch('setUser', res);
            //     if(this.organization) {
            //         this.organization = res.organization;
            //     }
            // }).catch(err => {
            //     console.error(err);
            // });
            // this.getMembers();
        },

        methods: {
        }
    }
</script>