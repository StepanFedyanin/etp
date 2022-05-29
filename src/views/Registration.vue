<template>
    <div class="app__main">
        <div class="registration">
            <div class="container">
                <div
                    v-show="stepRegistration === 1"
                >
                    <div class="registration__title h2">
                        Укажите инн и кпп вашей организации
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <organization-search-form
                            ref="search"
                            :values="item.search"
                            :header="header"
                            @change="checkValid"
                            @next="searchOrg"
                            @prev="prevPerson"
                        />
                        <div class="form__submit auth__form-submit">
                            <button
                                type="submit"
                                class="button button-green"
                                @click="next"
                            >
                                Далее
                            </button>
                        </div>                    
                    </div>
                </div>
                <div
                    v-show="stepRegistration === 2"
                >
                    <div class="registration__title h2">
                        Сведения об организации
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <organization-add-form
                            ref="organization"
                            :values="item.organization"
                            :header="header"
                            @next="searchOrg"
                            @prev="prevPerson"
                        />
                        <div class="form__submit auth__form-submit">
                            <button
                                class="button button-red"
                                @click="prev"
                            >
                                Назад
                            </button>
                            <button
                                class="button button-green"
                                @click="next"
                            >
                                Далее
                            </button>
                        </div>                    
                    </div>
                </div>
                <div
                    v-show="stepRegistration === 3"
                >
                    <div class="registration__title h2">
                        Сведения о пользователе
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <person-add-form
                            ref="person"
                            :values="item.person"
                            :header="header"
                            @next="searchOrg"
                            @prev="prevPerson"
                        />
                        <div class="form__submit auth__form-submit">
                            <button
                                class="button button-red"
                                @click="prev"
                            >
                                Назад
                            </button>
                            <button
                                class="button button-green"
                                @click="next"
                            >
                                Далее
                            </button>
                        </div>                    
                    </div>
                </div>
                <div
                    v-show="stepRegistration === 4"
                >
                    <div class="registration__title h2">
                        Пригласите ваших партнеров
                    </div>
                    <div class="registration__content text">
                        <p>Вы сможете найти себе проверенных поставщиков или поучаствовать в тендере ....<br> Укажите ФИО и email, площадка отправит приглашения на указанную почту.</p>
                    </div>
                    <div
                        class="registration__form form"
                    >
                        <div
                            v-for="invite in inviteNumbers"
                            :key="invite"
                        >
                            <div 
                                class="registration__subtitle h3"
                            >
                                Приглашение №{{ invite }}
                            </div>
                            <invite-add-form
                                v-if="isStage('search')"
                                ref="person"
                                :values="item.person"
                                :header="header"
                                @next="searchOrg"
                                @prev="prevPerson"
                            />
                        </div>
                        <div class="form__submit auth__form-submit">
                            <button
                                class="button button-green"
                                @click="addInvite"
                            >
                                Добавить приглашение
                            </button>
                            <button
                                class="button button-green"
                                @click="sendInvite"
                            >
                                Отправить приглашение
                            </button>
                            <button
                                class="button button-red"
                                @click="next"
                            >
                                Завершить регистрацию
                            </button>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import organizationSearchForm from '@/components/registration/organization-search-form';
    import organizationAddForm from '@/components/registration/organization-add-form';
    import personAddForm from '@/components/registration/person-add-form';
    import inviteAddForm from '@/components/registration/invite-add-form';
    //import modal from "@/components/modal";

    export default {
        components: {
            //modal,
            organizationSearchForm,
            organizationAddForm,
            personAddForm,
            inviteAddForm
        },
        props: {
            header: {
                type: String,
                default() { return ''; }
            },
            item: {
                type: Object,
                default() { return {}; }
            },
        },        
        data() {
            return {
                stage: 'search',
                changeReason: undefined,
                result: undefined,
                modalCloseBrowser: false,
                stepRegistration: this.$store.state.stepRegistration || 1,
                inviteNumbers: 1,
                isValid: false,
            };
        },
        computed: {
            params() {
                return {
                    search: this.$refs.search.serialize(),
                    organization: this.$refs.organization.serialize(),
                };
            }
        },
        methods: {
            checkValid() {
                this.isValid = !!(this.$refs.search.validate());
            },
            addInvite() {
                this.inviteNumbers++;
            },
            isStage(stage) {
                return this.stage === stage;
            },
            goTo(stage) {
                this.stage = stage;
            },
            serialize() {
                return this.params;
            },
            prev() {
                console.log(this.serialize());
                this.$store.dispatch('setStepRegistration', this.stepRegistration - 1);
                this.stepRegistration = this.$store.state.stepRegistration;
                //this.$emit('prev', this.serialize());
            },
            next() {
                console.log(this.serialize());
                if (this.stepRegistration !== 4) {
                    this.$store.dispatch('setStepRegistration', this.stepRegistration + 1);
                    this.stepRegistration = this.$store.state.stepRegistration;
                    //this.$emit('next', this.serialize());
                } else {
                    this.$store.dispatch('setStepRegistration', null);
                    this.$router.push({ name: 'auth' });
                }
            },
            prevPerson() {
                this.prev();
            },
            searchOrg() {
                console.log('ff')
            },
            prevConfirm() {
                this.goTo('agents');
            },
        }
    };
</script>
