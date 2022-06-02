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
                    :organization="organization"
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
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                },
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
        },
        methods: {
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            }
        }
    };
</script>
