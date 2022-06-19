<template>
    <div class="profile">
        <h2 class="profile__title h2">
            Мой профиль
        </h2>
        <div 
            v-if="user.is_staff || (user.is_master && user.organization.id) " 
            class="profile__edit"
            @click="onClickEditProfile()"
        >
            <svg 
                height="24" 
                width="24"
            >
                <use xlink:href="../assets/img/icons/icons.svg#edit" />
            </svg>
        </div>
        <div class="profile__table table">
            <div class="table__column">
                <!-- <div
                    v-for="(value, name) in user"
                    class="table__item"
                >
                    <div class="table__label">
                        {{ name }}
                    </div>
                    <div class="table__value">
                        {{ value }}
                    </div>
                </div> -->
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
                        <!-- {{ $helpers.formatTel(user.phone) }} -->
                        {{ user.phone ? user.phone : '-' }}
                    </div>
                </div>
            </div>
        </div>
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
        methods: {
            onClickEditProfile() {
                this.$router.push({ name: 'profile-edit'});
            }
        }
    };
</script>
