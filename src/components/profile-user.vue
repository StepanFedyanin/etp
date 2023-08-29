<template>
    <div class="profile">
        <h2 
            v-if="user && user.id == $store._state.data.user.id"
            class="profile__title h2"
        >
            Мой профиль
        </h2>
        <h2 
            v-else
            class="profile__title h2"
        >
            Профиль сотрудника
        </h2>
        <div 
            v-if="user.is_active" 
            class="svg-icon svg-icon__edit"
            @click="onClickEditProfile()"
        />
        <div 
            v-if="user.is_active" 
            class="svg-icon svg-icon__changePassword"
            @click="onClickEditPassword()"
        />
        <div class="profile__table table">
            <div class="table__column">
                <div class="table__item">
                    <div class="table__label">
                        Email (логин):
                    </div>
                    <div class="table__value">
                        {{ user.email }}
                    </div>
                </div>
                <div class="table__item">
                    <div class="table__label">
                        Фамилия:
                    </div>
                    <div class="table__value">
                        {{ user.last_name }}
                    </div>
                </div>
                <div class="table__item">
                    <div class="table__label">
                        Имя
                    </div>
                    <div class="table__value">
                        {{ user.first_name }}
                    </div>
                </div>
                <div class="table__item">
                    <div class="table__label">
                        Отчество
                    </div>
                    <div class="table__value">
                        {{ user.patronymic }}
                    </div>
                </div>
            </div>
            <div class="table__column">
                <div class="table__item">
                    <div class="table__label">
                        Должность:
                    </div>
                    <div class="table__value">
                        {{ user.post }}
                    </div>
                </div>

                <div class="table__item">
                    <div class="table__label">
                        Email (контактный):
                    </div>
                    <div class="table__value">
                        {{ user.contact_email ? user.contact_email : '-' }}
                    </div>
                </div>

                <div class="table__item">
                    <div class="table__label">
                        Телефон (контактный):
                    </div>
                    <div class="table__value">
                        {{ user.phone ? user.phone : '-' }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="double">
            <button 
                class="button button-outline-green"
                @click="onClickEditProfile()"
            >
                изменить данные
            </button>
            <button 
                class="button button-outline-green"
                @click="onClickEditPassword()"
            >
                изменить пароль
            </button>
        </div> -->
    </div>
</template>
<script>
    export default {
        name: 'ProfileUser',
        props: {
            user: {
                type: Object,
                default() { 
                    return {} 
                }
            },
        },
        data() {
            return {

            };
        },
        created() {
        },
        methods: {
            onClickEditProfile() {
                this.$router.push({ name: 'profile-edit'});
            },
            onClickEditPassword() {
                this.$router.push({ name: 'profile-edit-password'});
            }
        }
    };
</script>
