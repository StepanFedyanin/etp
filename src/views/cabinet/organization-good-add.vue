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
                            { name: 'Товары', route: { name: 'organization', hash: '#goods' } },
                        ]"
                    />
                    <GoodAdd
                        :key="`good-edit-${slug}`"
                        :slug="slug"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { cabinet } from "@/services";
    import GoodAdd from '@/components/forms/good-add';

    export default {
        components: {
            GoodAdd,
        },
        props: {
            slug: {
                type: [String, Number],
                default() { return null; }
            },
        },
        data() {
            return {
            }
        },
        created() {
        },
        methods: {
        }
    }
</script>