<template>
    <div>
        <div class="organization__persons">
            <template v-if="showLoaderSending">
                <div class="organization__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else-if="persons.length">    
                <blockPersons 
                    :organization="organization"
                    :persons="persons"
                    @updateData="getMembers"
                />
            </template>
            <template v-else>
                <div class="tenders__empty">
                    В данный момент нет сотрудников
                </div> 
            </template>
        </div>
        <template v-if="user.is_staff || user.is_master">
            <button
                class="button button-outline-green button-width-auto m--medium"
                @click="onClickAddStaff()"
            >
                Создать аккаунт для сотрудника
            </button>
            <div class="organization__content text">
                <p>Вы можете добавлять новых сотрудников (представителей компании), редактировать и деактивировать их.</p>
                <p>Каждый сотрудник будет иметь собственную учетную запись для входа на платформу TUGAN.</p>
                <p>Список сотрудников виден только зарегистрированным участникам платформы.</p>
            </div>
        </template>
    </div>
</template>

<script>
    //import { urlPath } from '@/settings'
    import { user as api } from '@/services'
    import blockPersons from '@/components/block-persons.vue';

    export default {
        components: {
            blockPersons,
        },
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            organization: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                persons: [],
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getMembers()
        },
        mounted() {
        },
        methods: {
            getMembers() {
                this.showLoaderSending = true;
                api.getMyOrganizationMembers().then(res => {
                    this.showLoaderSending = false;
                    this.persons = res;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            onClickAddStaff() {
                this.$router.push({ name: 'organization-add-person'});
            },

        },
    };
</script>
