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
                        <ProfileEdit
                            v-if="profile"
                            :item="profile"
                        />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileEdit from '@/components/forms/profile-edit.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            ProfileEdit,
        },
        data() {
            return {
                profile: undefined,
                organization: {},
                item: [],
                showLoaderSending: false,
            }
        },
        created() {
            this.showLoaderSending = true;
            api.getMyProfile().then(res => {
                this.profile = res;
                if(this.organization){
                    this.organization = res.organization;
                }
                this.showLoaderSending = false;
            }).catch(err => {
                this.showLoaderSending = false;
                console.error(err);
            });
        },
        methods: {
        }
    }
</script>