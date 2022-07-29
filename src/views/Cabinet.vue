<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div>
                    <div>Пригласить партнеров</div>
                    <div 
                        class="button button-green" 
                        @click="onClickInvite"
                    >
                        Отправить приглашения
                    </div>
                </div>
                <!-- <div class="sidebar__menu-link" @click="onClickOrganization">Моя организация</div> -->
            </div>
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
                url: {
                    hashtags: 'https://dka-develop.ru/api?type=hashtag',
                    contragents: 'http://tugan-app.flexidev.ru/user/organization/',
                    persons:''
                },
                contragent: {
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                },
                organization: {},
                persons: [],
                tenders: [],
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
