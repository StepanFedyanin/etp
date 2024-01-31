<template>
    <div class="app__main">
        <div class="cabinet">
            <div class="profile m--block">
                <div class="container">
                    <app-breadcrumbs 
                        :breadcrumbs="[
                            { name: 'Главная', route: { name: 'home' } },
                            { name: 'Кабинет', route: { name: 'cabinet' } },
                            { name: 'Маркет', route: { name: 'market' } },
                            { name: 'Товары', route: { name: 'market', hash: '#goods' } },
                        ]"
                    />
                    <blockHint
                        :slug="`${$route.name}_top`"
                        classModifier="profile__hint m--mt"
                    />
                    <GoodAdd
                        :key="`interface-${$route.name}`"
                    />
                    <blockHint
                        :slug="`${$route.name}_bottom`"
                        classModifier="profile__hint"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { cabinet } from "@/services";
    import GoodAdd from '@/components/forms/good-add';
    import blockHint from '@/components/block-hint.vue';

    export default {
        components: {
            GoodAdd,
            blockHint
        },
        props: {
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