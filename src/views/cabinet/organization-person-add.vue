<template>
    <div class="app__main">
        <div class="cabinet">
            <div class="profile m--block">
                <div class="container">
                    <app-breadcrumbs 
                        :breadcrumbs="[
                            { name: 'Главная', route: { name: 'home' } },
                            { name: 'Кабинет', route: { name: 'cabinet' } },
                            { name: 'Профиль организации', route: { name: 'organization' } },
                        ]"
                    />
                    <div class="profile__title h1">
                        {{ personId ? 'Редактирование пользователя' : 'Добавление пользователя' }}
                    </div>
                    <PersonAdd
                        :personId="personId"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { cabinet } from "@/services";
    import PersonAdd from '@/components/forms/person-add';

    export default {
        components: {
            PersonAdd,
        },
        props: {
            personId: {
                type: [String, Number],
                default() { return null; }
            },
        },
        data() {
            return {
                person: {},
                showLoaderSending: false,
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>