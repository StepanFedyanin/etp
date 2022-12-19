<template>
    <div class="cabinet contragent">
        <div class="container">
            <template
                v-if="showLoaderSending"
            >
                <div class="contragent__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template
                v-else
            >
                <div class="contragent__title h1">
                    {{ contragent.name }}
                </div>
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
                            <div class="contragent__info-param-name">
                                Юридический адрес
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.legal_address }}
                            </div>
                        </div>
                        <div class="contragent__info-param">
                            <div class="contragent__info-param-name">
                                Фактический адрес
                            </div>
                            <div class="contragent__info-param-data">
                                {{ contragent.actual_address }}
                            </div>
                        </div>
                        <div class="contragent__info-title h2">
                            О компании
                        </div>
                        <div 
                            class="contragent__info-about text"
                            v-html="contragent.about_company"
                        />
                    </div>
                    <div class="contragent__info-right">
                        <div class="contragent__info-block">
                            <div class="contragent__info-params">
                                <!--div class="contragent__info-favorite">У вас в избранном</div-->
                                <div class="contragent__info-param m--inline">
                                    <div class="contragent__info-param-name">
                                        ИНН
                                    </div>
                                    <div class="contragent__info-param-data">
                                        {{ contragent.inn }}
                                    </div>
                                </div>
                                <div class="contragent__info-param m--inline">
                                    <div class="contragent__info-param-name">
                                        КПП
                                    </div>
                                    <div class="contragent__info-param-data">
                                        {{ contragent.kpp }}
                                    </div>
                                </div>
                                <div class="contragent__info-param m--inline">
                                    <div class="contragent__info-param-name">
                                        ОКПО
                                    </div>
                                    <div class="contragent__info-param-data">
                                        {{ contragent.okpo }}
                                    </div>
                                </div>
                                <div class="contragent__info-param m--inline">
                                    <div class="contragent__info-param-name">
                                        ОГРН
                                    </div>
                                    <div class="contragent__info-param-data">
                                        {{ contragent.ogrn }}
                                    </div>
                                </div>
                            </div>
                            <div class="contragent__info-logo">
                                <img 
                                    :src="contragent.logo"
                                    alt=""
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
                            <div class="contragent__info-param m--inline">
                                <div class="contragent__info-param-name">
                                    Сайт
                                </div>
                                <div class="contragent__info-param-data">
                                    {{ contragent.website }}
                                </div>
                            </div>
                            <div class="contragent__info-param m--inline">
                                <div class="contragent__info-param-name">
                                    Контактный телефон
                                </div>
                                <div class="contragent__info-param-data">
                                    {{ contragent.contact_phone }}
                                </div>
                            </div>
                            <div class="contragent__info-param m--inline">
                                <div class="contragent__info-param-name">
                                    Контактный email
                                </div>
                                <div class="contragent__info-param-data">
                                    {{ contragent.contact_email }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--div class="contragent__block">
                    <blockOrganization 
                        :organization="contragent"
                    />
                </div-->
                <template
                    v-if="user && user.id"
                >
                    <div class="contragent__subtitle h2">
                        Представители организации
                    </div>
                    <div class="contragent__block">
                        <blockPersons 
                            :persons="persons"
                            @updated="getMembers"
                        />
                    </div>
                </template>
                <div class="contragent__subtitle h2">
                    Заказчик <span class="m--color-green"> {{ createdTenders.count }}  {{ getNoun(createdTenders.count) }} </span>
                </div>
                <div class="contragent__tenders tenders tenders__created">
                    <blockTenderMini
                        v-for="(tender, index) in createdTenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />
                    <button 
                        v-if="createdTenders.count > countCreatedTenders"
                        class="button button-outline-green tenders__more"
                        @click="getCreatedTenders()"
                    >
                        показать еще
                    </button>
                </div>
                <div class="contragent__subtitle h2">
                    Участник <span class="m--color-green">{{ participationTenders.count }} {{ getNoun(participationTenders.count) }} </span>
                </div>
                <div 
                    v-if="participationTenders && participationTenders.count"
                    class="contragent__tenders tenders participation__created"
                >
                    <blockTenderMini
                        v-for="(tender, index) in participationTenders.results"
                        :key="`tender-${index}`"
                        :tender="tender"
                        :whole="true"
                    />

                    <button 
                        v-if="participationTenders.count > countParticipationTenders"
                        class="button button-outline-green tenders__more"
                        @click="getParticipationTenders()"
                    >
                        показать еще
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    //import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import { user as api } from "@/services";
    // import { number } from '@formkit/inputs';

    export default {
        components: {
            //blockOrganization,
            blockPersons,
            blockTenderMini
        },
        props: {
            id: {
                type: String,
                default() { return null; }
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        data() {
            return {
                contragent: {},
                contragents: undefined,
                persons: [],
                participationTenders: {},
                createdTenders: {},
                limitParticipation: 5,
                offsetParticipation: 0,
                limitCreated: 5,
                offsetCreated: 0,
                tenders: null,
                countCreatedTenders: 0,
                countParticipationTenders: 0,
                showLoaderSending: false,
            }
        },
        mounted() {
            
        },
        beforeDestroy() {
        },
        created() {
            this.showLoaderSending = true;
            api.getOrganization(this.id).then(res => {
                this.contragent = res;
                this.$helpers.setDocumentTitle(this.contragent);
                this.$helpers.setDocumentMeta(this.contragent);
                this.showLoaderSending = false;
            }).catch(err => {
                console.error(err);
                this.showLoaderSending = false;
            });

            this.getCreatedTenders();
            this.getParticipationTenders();
            this.getMembers();
            this.getNoun(4, "тендров", "тендер", "тендера", "тендеров");
        },
        methods: {
            getMembers() {
                if (this.user && this.user.id) {
                    api.getOrganizationMembers(this.id).then(res => {
                        this.persons = res;

                    }).catch(err => {
                        console.error(err);
                    });
                }
            },
            getParticipationTenders(){
                api.getParticipationTenders(this.id, {limit: this.limit, offset: this.offsetParticipation}).then(res =>{
                    if(this.offsetParticipation===0){
                        this.participationTenders = res;
                    }else if(this.participationTenders.results){
                        this.participationTenders = {...this.participationTenders, ...res, results: [...this.participationTenders.results, ...res.results]}
                    }
                    this.offsetParticipation += 5;
                    this.countParticipationTenders = this.participationTenders.results.length;
                });
            },
            getCreatedTenders(){
                api.getCreatedTenders(this.id, {limit: this.limit, offset: this.offsetCreated}).then(res =>{
                    if(this.offsetCreated===0){
                        this.createdTenders = res;
                    }else if(this.createdTenders.results){
                        this.createdTenders = {...this.createdTenders, ...res, results: [...this.createdTenders.results, ...res.results]}
                    }
                    this.offsetCreated += 5;
                    this.countCreatedTenders = this.createdTenders.results.length;
                });
            },
            getNoun(number) {
                let n = Math.abs(number);
                n %= 100;
                if (n === 0 || n >= 2 && n <= 20) {
                    return "тендеров";
                }
                n %= 10;
                if (n === 1) {
                    return "тендера";
                }
                return "тендеров";
            }
        }
    };
</script>
