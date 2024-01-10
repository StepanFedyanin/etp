<template>
    <div class="profile__form">
        <div class="profile__form-main">
            <div class="profile__account">
                <div class="profile__account-title">Почта для входа и email-уведомлений</div>
                <div class="profile__account-param">{{ user.email }}</div>
                <div class="profile__account-links">
                    <a 
                        href="#" 
                        class="profile__account-link"
                        @click.prevent="onClickProfileEmail"
                    >
                        Изменить email
                    </a>
                    <a 
                        href="#" 
                        class="profile__account-link"
                        @click.prevent="onClickProfilePassword"
                    >
                        Изменить пароль
                    </a>
                </div>
            </div>
            <div class="profile__account">
                <div class="profile__account-title">Телефон для защиты аккаунта</div>
                <div class="profile__account-param">{{ user.phone }}</div>
                <div class="profile__account-links">
                    <a 
                        href="#" 
                        class="profile__account-link"
                        @click.prevent="onClickProfilePhone"
                    >
                        Изменить номер
                    </a>
                </div>
            </div>
        </div>
        <ModalProfilePassword
            :showModal="showProfilePasswordModal"
            @hideModal="hideProfilePasswordModal"
        />
        <ModalProfileEmail
            :showModal="showProfileEmailModal"
            @hideModal="hideProfileEmailModal"
        />
        <ModalProfilePhone
            :showModal="showProfilePhoneModal"
            @hideModal="hideProfilePhoneModal"
        />
    </div>
</template>
<script>
    import ModalProfilePassword from '@/components/modals/profile-password';
    import ModalProfileEmail from '@/components/modals/profile-email';
    import ModalProfilePhone from '@/components/modals/profile-phone';

    export default {
        name: 'ProfileAccount',
        components: {
            ModalProfilePassword,
            ModalProfileEmail,
            ModalProfilePhone
        },
        props: {
        },
        data() {
            return {
                showProfilePasswordModal: false,
                showProfileEmailModal: false,
                showProfilePhoneModal: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
        },
        methods: {
            onClickProfilePassword() {
                this.showProfilePasswordModal = true;
            },
            hideProfilePasswordModal(updateData) {
                this.showProfilePasswordModal = false;
            },
            onClickProfileEmail() {
                this.showProfileEmailModal = true;
            },
            hideProfileEmailModal(updateData) {
                this.showProfileEmailModal = false;
            },
            onClickProfilePhone() {
                this.showProfilePhoneModal = true;
            },
            hideProfilePhoneModal(updateData) {
                this.showProfilePhoneModal = false;
            },
        }
    };
</script>
