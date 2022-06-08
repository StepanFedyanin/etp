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
                    <ProfileEdit />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs';
    import ProfileEdit from '@/components/profile-edit.vue';

    export default {
        components: {
            Breadcrumbs,
            ProfileEdit
        },
        // id: {
        //     type: Object,
        //     default() { return {} }
        // },
    }
</script>