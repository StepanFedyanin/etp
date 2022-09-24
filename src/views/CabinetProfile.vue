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
                    <template
                        v-if="showLoaderSending"
                    >
                        <div class="cabinet__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <template
                        v-else
                    >
                        <ProfileUser
                            :user="profile"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import ProfileUser from '@/components/profile-user.vue';

    export default {
        components: {
            ProfileUser,
        },
        data() {
            return {
                profile: {},
                organization: {},
                showLoaderSending: false,
            }
        },
        mounted() {
            this.showLoaderSending = true;
            api.getMyProfile().then(res => {
                this.profile = res;
                this.$store.dispatch('setUser', res);
                if(this.organization) {
                    this.organization = res.organization;
                }
                this.showLoaderSending = false;
            }).catch(err => {
                this.showLoaderSending = false;
                console.error(err);
            });
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickEditOrganization() {
                this.$router.push({ name: 'organization-edit'});
            },
        }
    }
</script>
