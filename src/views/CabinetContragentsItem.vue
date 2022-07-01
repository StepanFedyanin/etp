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
                    :blockClass="contragent__organization"
                    :organization="contragent"
                />
            </div>
            <div class="contragent__subtitle h2">
                Представители организации
            </div>
            <div class="contragent__block">
                <blockPersons 
                    :blockClass="contragent__persons"
                    :persons="persons"
                />
            </div>
            <div class="contragent__subtitle h2">
                Заказчик <span class="m--color-green">5 тендеров</span>
            </div>
            <div class="contragent__tenders tenders">
                <blockTenderMini
                    v-for="(tender, index) in createdTenders.results"
                    :key="`tender-${index}`"
                    :tender="tender"
                    :whole="true"
                />

                <a 
                    class="button button-outline-green tenders__more"
                    href="#"
                    @click="getParticipationTendersMore()"
                >
                    показать все
                </a>
            </div>
            <div class="contragent__subtitle h2">
                Участник <span class="m--color-green">1 тендер</span>
            </div>
            <div 
                v-if="participationTenders && participationTenders.count"
                class="contragent__tenders tenders"
            >
                <blockTenderMini
                    v-for="(tender, index) in participationTenders.results"
                    :key="`tender-${index}`"
                    :tender="tender"
                    :whole="true"
                />

                <a 
                    class="button button-outline-green tenders__more"
                    href="#"
                >
                    показать все
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import blockOrganization from '@/components/block-organization.vue';
    import blockPersons from '@/components/block-persons.vue';
    // import blockTender from '@/components/block-tender.vue';
    import blockTenderMini from '@/components/block-tender-mini.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            blockOrganization,
            blockPersons,
            // blockTender,
            blockTenderMini
        },
        props: {
            id: {
                type: Number,
                default() { return null; }
            },
        },
        data() {
            return {
                contragent: {},
                contragents: undefined,
                // organization: {},
                persons: [],
                participationTenders: {},
                createdTenders: {},
                limit: 5,
                offset: 0,
                tenders: null,
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
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                api.getParticipationTenders(this.id,params).then(res =>{
                    this.participationTenders = res;
                    console.log(res);
                });
            },
            getCreatedTenders(){
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                api.getCreatedTenders(this.id, params).then(res =>{
                    this.createdTenders = res;
                    console.log(res);
                });
            },
            getParticipationTendersMore(){
                // let limit = Number(this.limit)
                
                let params = {
                    limit: this.limit,
                    offset: this.offset += 10
                }
                console.log(params.limit);
                console.log(params.offset);
                // const createdTenders = this.getCreatedTenders(this.id, params);
                // console.log(createdTenders());

                // createdTenders +=

            }

            

        }
    };
</script>
