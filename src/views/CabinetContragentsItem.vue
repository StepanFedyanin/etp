<template>
    <div class="cabinet contragent">
        <div class="container">
            <div class="contragent__title h1">
                {{ contragent.name }}
            </div>
            <div class="contragent__subtitle h2">
                Информация о компании
            </div>
            <div class="contragent__block">
                <blockOrganization 
                    :organization="contragent"
                />
            </div>
            <div class="contragent__subtitle h2">
                Представители организации
            </div>
            <div class="contragent__block">
                <blockPersons 
                    :persons="persons"
                />
            </div>
            <div class="contragent__subtitle h2">
                Заказчик <span class="m--color-green"> {{ createdTenders.count }} тендеров</span>
            </div>
            <div class="contragent__tenders tenders tenders__created">
                <blockTenderMini
                    v-for="(tender, index) in createdTenders.results"
                    :key="`tender-${index}`"
                    :tender="tender"
                    :whole="true"
                />
                <button 
                    v-if="createdTenders.count > this.countCreatedTenders"
                    class="button button-outline-green tenders__more"
                    @click="getCreatedTenders()"
                >
                    показать еще
                </button>
            </div>
            <div class="contragent__subtitle h2">
                Участник <span class="m--color-green">{{ participationTenders.count }} тендер</span>
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
                    v-if="participationTenders.count > this.countParticipationTenders"
                    class="button button-outline-green tenders__more"
                    @click="getParticipationTenders()"
                >
                    показать еще
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import { user as api } from "@/services";
    // import { number } from '@formkit/inputs';

    export default {
        components: {
            blockOrganization,
            blockPersons,
            blockTenderMini
        },
        props: {
            id: {
                type: String,
                default() { return null; }
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
            }
        },
        mounted() {
            },
        beforeDestroy() {
        },
        created() {
            api.getOrganization(this.id).then(res => {
                this.contragent = res;
            }).catch(err => {
                console.error(err);
            });

            this.getCreatedTenders();
            this.getParticipationTenders();
            this.getMembers();
        },
        methods: {
            getMembers() {
                api.getOrganizationMembers(this.id).then(res => {
                    this.persons = res;

                }).catch(err => {
                    console.error(err);
                });
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
        }
    };
</script>
