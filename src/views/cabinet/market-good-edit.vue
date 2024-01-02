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
                    <GoodAdd
                        :key="`interface-${$route.name}`"
                        :goodId="goodId"
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
            goodId: {
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