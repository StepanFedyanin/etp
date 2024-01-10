<template>
    <div class="contragent__info">
        <div class="contragent__info-left">
            <div class="contragent__info-name">
                {{ contragent.full_name }}
            </div>
            <div class="contragent__info-tags">
                <div
                    v-if="contragent.manufacturer" 
                    class="contragent__info-tag"
                >
                    Производитель
                </div>
                <div 
                    v-if="contragent.contractor" 
                    class="contragent__info-tag"
                >
                    Подрядчик
                </div>
                <div 
                    v-if="contragent.gen_contractor" 
                    class="contragent__info-tag"
                >
                    Генподрядчик
                </div>
                <div 
                    v-if="contragent.dealer" 
                    class="contragent__info-tag"
                >
                    Дилер/дистрибьютор
                </div>
            </div>
            <div class="contragent__info-principal">
                {{ contragent.principal_activity }}
            </div>
            <div class="contragent__info-param">
                <div class="contragent__info-param-name">
                    Директор
                </div>
                <div class="contragent__info-param-data">
                    {{ contragent.head_name }}
                </div>
            </div>
            <div class="contragent__info-param">
                <div v-if="contragent.legal_address" class="contragent__info-param-name">
                    Юридический адрес
                </div>
                <div class="contragent__info-param-data">
                    {{ contragent.legal_address }}
                </div>
            </div>
            <div v-if="contragent.actual_address" class="contragent__info-param">
                <div class="contragent__info-param-name">
                    Фактический адрес
                </div>
                <div class="contragent__info-param-data">
                    {{ contragent.actual_address }}
                </div>
            </div>
            <template v-if="contragent.about_company">
                <div class="h2">
                    О компании
                </div>
                <div 
                    class="contragent__info-about text"
                    v-html="contragent.about_company.replace(/\n/g, '<br/>')"
                />
            </template>
        </div>
        <div class="contragent__info-right">
            <div class="contragent__info-right-inner">
                <div 
                    v-if="user && user.id && user.organization?.id !== contragent.id"
                    class="contragent__info-favorite"
                    :class="contragent.is_favorite && 'm--favorite'"
                    @click.prevent="toggleFavorite()"
                >
                    {{ contragent.is_favorite ? 'У вас в избранном' : 'Добавить в избранное' }}
                </div>
                <div class="contragent__info-block">
                    <div class="contragent__info-params">
                        <div v-if="contragent.inn" class="contragent__info-param m--inline">
                            <div class="contragent__info-param-name">
                                ИНН
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.inn }}
                            </div>
                        </div>
                        <div v-if="contragent.kpp" class="contragent__info-param m--inline">
                            <div class="contragent__info-param-name">
                                КПП
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.kpp }}
                            </div>
                        </div>
                        <div v-if="contragent.okpo" class="contragent__info-param m--inline">
                            <div class="contragent__info-param-name">
                                ОКПО
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.okpo }}
                            </div>
                        </div>
                        <div v-if="contragent.ogrn" class="contragent__info-param m--inline">
                            <div class="contragent__info-param-name">
                                ОГРН
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.ogrn }}
                            </div>
                        </div>
                    </div>
                    <div 
                        class="contragent__info-logo"
                        :class="contragent.logo ? '' : 'm--no-logo'"
                    >
                        <img 
                            v-if="contragent.logo"
                            :src="contragent.logo"
                            :alt="contragent.name"
                        >
                    </div>
                </div>
                <div class="contragent__info-rating">
                    Рейтинг Контур.Фокус
                    <div
                        :class="`m--${contragent.color_status}`"
                    >
                        {{ contragent.color_status_detail }}
                    </div>
                </div>
                <div class="contragent__info-params">
                    <div class="contragent__info-param m--inline">
                        <div class="contragent__info-param-name">
                            Дата регистрации
                        </div>
                        <div class="contragent__info-param-data">
                            {{ $helpers.parseDate(contragent.date_registration, 'YYYY-MM-DD').toLocaleDateString('ru') }}
                        </div>
                    </div>
                    <div class="contragent__info-param m--inline">
                        <div class="contragent__info-param-name">
                            Уставный капитал
                        </div>
                        <div class="contragent__info-param-data">
                            {{ $helpers.toPrice(contragent.capital) }}
                        </div>
                    </div>
                    <div class="contragent__info-param m--inline m--margin">
                        <div class="contragent__info-param-name">
                            Статус ЕГРЮЛ
                        </div>
                        <div class="contragent__info-param-data">
                            {{ contragent.status_detail }}
                        </div>
                    </div>
                    <div 
                        v-if="contragent.website"
                        class="contragent__info-param m--inline"
                    >
                        <div class="contragent__info-param-name">
                            Сайт
                        </div>
                        <a 
                            :href="contragent.website"
                            target="_blank"
                            class="contragent__info-param-data"
                        >
                            {{ contragent.website }}
                        </a>
                    </div>
                    <div 
                        v-if="contragent.contact_phone"
                        class="contragent__info-param m--inline"
                    >
                        <div class="contragent__info-param-name">
                            Контактный телефон
                        </div>
                        <a 
                            :href="`tel:${contragent.contact_phone}`"
                            target="_blank"
                            class="contragent__info-param-data"
                        >
                            {{ contragent.contact_phone }}
                        </a>
                    </div>
                    <div 
                        v-if="contragent.contact_email"
                        class="contragent__info-param m--inline"
                    >
                        <div class="contragent__info-param-name">
                            Контактный email
                        </div>
                        <a 
                            :href="`mailto:${contragent.contact_email}`"
                            target="_blank"
                            class="contragent__info-param-data"
                        >
                            {{ contragent.contact_email }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as userApi } from "@/services"
    export default {
        components: {
        },
        props: {
            contragent: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            toggleFavorite() {
                this.$emit('toggleFavorite');
            },
        }
    };
</script>
