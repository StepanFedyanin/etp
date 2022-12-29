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
                        <template
                            v-if="contragent.about_company"
                        >
                            <div class="contragent__info-title h2">
                                О компании
                            </div>
                            <div 
                                class="contragent__info-about text"
                                v-html="contragent.about_company"
                            />
                        </template>
                    </div>
                    <div class="contragent__info-right">
                        <div 
                            class="contragent__info-favorite"
                            :class="contragent.is_favorite && 'm--favorite'"
                            @click.prevent="toggleFavorite()"
                        >
                            {{ contragent.is_favorite ? 'У вас в избранном' : 'Добавить в избранное' }}
                        </div>
                        <div class="contragent__info-block">
                            <div class="contragent__info-params">
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
                <template
                    v-if="createdTenders.count"
                >
                    <div class="contragent__subtitle h2">
                        Заказчик <span class="m--color-green">{{ $helpers.stringForNumber(createdTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
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
                </template>
                <template
                    v-if="participationTenders.count"
                >
                    <div class="contragent__subtitle h2">
                        Участник <span class="m--color-green">{{ $helpers.stringForNumber(participationTenders.count, ['тендера', 'тендеров', 'тендеров']) }}</span>
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
                <template
                    v-if="contragent.neighbouring_organizations && contragent.neighbouring_organizations.length"
                >
                    <div class="contragent__subtitle h2">
                        Другие организации
                    </div>
                    <div class="contragent__siblings">
                        <router-link
                            v-for="item in contragent.neighbouring_organizations"
                            :key="`contragent-${item.id}`"
                            :to="{ name: 'contragent', params: { id: item.id } }"
                            class="contragent__siblings-item"
                        >
                            <div 
                                class="contragent__siblings-item-logo"
                                :class="item.logo ? '' : 'm--no-logo'"
                            >
                                <img 
                                    v-if="item.logo"
                                    :src="item.logo" 
                                    :alt="item.name"
                                />
                            </div>
                            <div class="contragent__siblings-item-name">
                                {{ item.name }}    
                            </div>
                            <div class="contragent__siblings-item-city">
                                {{ item.city }}    
                            </div>
                        </router-link>
                    </div>
                </template>                
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
        watch: {
            'id': {
                immediate: true,
                handler() {
                    this.getOrganization();
                    this.getCreatedTenders();
                    this.getParticipationTenders();
                    this.getMembers();
                },
            }
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
        },
        methods: {
            getOrganization() {
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
            },
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
            toggleFavorite() {
                this.contragent.is_favorite = !this.contragent.is_favorite;
                api.switchFavoriteOrganization(this.contragent.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },

        }
    };
</script>
