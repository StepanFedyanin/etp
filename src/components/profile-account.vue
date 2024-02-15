<template>
    <div class="profile__form">
        <template v-if="showLoaderSending">
            <div class="profile__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template v-else>
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
                <div v-if="user.organization" class="profile__account">
                    <div class="profile__account-title">Входить на платформу как:</div>
                    <div class="profile__account-buttons">
                        <button 
                            :class="['profile__account-button', user.im_auth_type === 'person' && 'is-active']"
                            @click.prevent="onClickChangeProfileType('person')"
                        >
                            <div class="profile__account-type">Частное лицо</div>
                            <div class="profile__account-name">{{ user.last_name }}</div>
                            <div class="profile__account-subname">{{ user.first_name }} {{ user.patronymic }}</div>
                        </button>
                        <button 
                            :class="['profile__account-button', user.im_auth_type === 'organization' && 'is-active']"
                            @click.prevent="onClickChangeProfileType('organization')"
                        >
                            <div class="profile__account-type">Сотрудник</div>
                            <div class="profile__account-name">{{ user.organization?.name }}</div>
                            <div class="profile__account-subname">
                                {{ user.last_name }} {{ `${user.first_name && user.first_name[0] + '.'}` }} {{ `${(user.first_name && user.patronymic) && user.patronymic[0] + '.'}` }}
                            </div>
                        </button>
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
        </template>
    </div>
</template>
<script>
    import { cabinet as api } from "@/services";

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
                showLoaderSending: false
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
            onClickChangeProfileType(type) {
                this.showLoaderSending = true;
                let params = { 
                    id: this.user.id,
                    im_auth_type: type 
                };
                api.updateMyProfilePartial(params).then(res => {
                    api.getMyProfile().then(res => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('setUser', res);
                    }).catch(err => {
                        this.showLoaderSending = false;
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            },
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
