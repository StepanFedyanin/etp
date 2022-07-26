<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div class="profile-edit">
                    <h1 class="profile-edit__title h1">
                        Сотрудник организации
                    </h1>
                    <h2 class="profile-edit__subtitle h2">
                        Изменить данные моего профиля
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
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfileEdit from '@/components/forms/profile-edit.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            // Breadcrumbs,
            ProfileEdit,
        },
        data() {
            return {
                profile: undefined,
                organization: {},
                item: [],
            }
        },
        created() {
            api.getMyProfile().then(res => {
                this.profile = res;
                if(this.organization){
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