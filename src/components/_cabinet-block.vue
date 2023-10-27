<template>
    <div class="cabinet__block cabinet__block-item">
        <div class="block__title">
            Пригласить партнеров
        </div>
        <div class="block__description">
            <p class="block__subtitle">
                Упростите собственный процесс закупок
            </p>
            <ul>
                <li>пригласите на площадку тех, с кем ваша компания уже торгует;</li>
                <li>сделайте ваш процесс закупок более прозрачным и удобным;</li>
                <li>укрепляйте связи с проверенными партнерами.</li>
            </ul>
        </div>
        <div 
            class="button button-green" 
            @click="onClickInvite"
        >
            Отправить приглашения
        </div>
    </div>
</template>
<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    export default {
        components: {
            // Breadcrumbs,

        },
        data() {
            return {
                contragents: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickProfile() {
                this.$router.push({ name: 'profile'});
            },
            onClickOrganization(){
                this.$router.push({ name: 'organization'})
            },
            onClickInvite(){
                this.$router.push({ name: 'invite'});
            }
        }
    };
</script>