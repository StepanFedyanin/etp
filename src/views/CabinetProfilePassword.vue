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
    import ProfilePassword from '@/components/forms/profile-password.vue';

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
        },

        methods: {
        }
    }
</script>