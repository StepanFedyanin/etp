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
                <blockTender
                    v-for="(tender, index) in 5"
                    :key="`tender-${index}`"
                    :tender="tender"
                />

                <a 
                    class="button button-outline-green tenders__more"
                    href="#"
                >
                    показать все
                </a>
            </div>
            <div class="contragent__subtitle h2">
                Участник <span class="m--color-green">1 тендер</span>
            </div>
            <div class="contragent__tenders tenders">
                <blockTender
                    v-for="(tender, index) in 1"
                    :key="`tender-${index}`"
                    :tender="tender"
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
    import blockTender from '@/components/block-tender.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            blockOrganization,
            blockPersons,
            blockTender
        },
        data() {
            return {
                contragent: {
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    full_name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    principal_activity: 'Разработка компьютерного программного обеспечения',
                    head_name: 'Жуков Николай Геннадьевич',
                    head_post: 'Директор',
                    legal_address: 'г. Челябинск, ул. Маркса, д. 46, ПОМЕЩ. 12, 454091',
                    actual_address: 'г. Челябинск, ул. Энтузиастов, д. 11в, оф. 320, 454091',
                    accountant_name: '',
                    color_status: 'green',
                    color_status_text: 'Зеленый',
                    status: 'Действующая',
                    date_registration: '20.11.07',
                    capital: '10 000',
                    inn: '7447123326',
                    kpp: '745301001',
                    okpo: '82903111',
                    ogrn: '1077447022575',
                    customer: '113',
                    member: '45'
                },
                contragents: undefined,
                organization: {},
                persons: [{
                    id: 1,
                    name: 'Жуков Николай Геннадьевич',
                    post: 'Директор',
                    email: 'info@flexites.org',
                    phone: '+7 (351) 267-29-94'
                }, {
                    id: 2,
                    name: 'Меренков Антон Антонович',
                    post: 'Менеджер',
                    email: 'mav@flexites.org',
                    phone: '+7 (351) 267-29-95'
                }, {
                    id: 3,
                    name: 'Некрасов Иван Иванович',
                    post: 'Менеджер',
                    email: 'nekrasov@flexites.org',
                    phone: '+7 (351) 267-29-95'
                }],
                tenders: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            // api.getOrganization(contragent.id).then(res => {
            //     this.organization = res.organization;
            // });
            // api.getMyProfile().then(res => {
            //     console.log(res);
            //     this.profile = res;
            //     if(this.organization){
            //         this.organization = res.organization;
            //         console.log(res.organization);
            //     }
            // }).catch(err => {
            //     console.error(err);
            // });
            console.log(this.formData);
        },
        methods: {
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            }
        }
    };
</script>
