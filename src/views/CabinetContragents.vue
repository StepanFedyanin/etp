<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet contragents">
            <div class="container">
                <div class="contragents__title h1">
                    Мои контрагенты
                </div>
                <div class="contragents__content text">
                    <p>В разработке</p>
                </div>

                <div class="contragents__block">
                    <div class="contragents__header">
                        <div class="contragents__header-cell m--name">
                            Название
                        </div>
                        <div class="contragents__header-cell m--activity">
                            Основной виде деятельности
                        </div>
                        <div class="contragents__header-cell m--customer">
                            Заказчик
                        </div>
                        <div class="contragents__header-cell m--member">
                            Участник
                        </div>
                    </div>
                    <div class="contragents__list">
                        <div 
                            v-for="contragent in contragents"
                            :key="`customer-${contragent.id}`"
                            class="contragents__item"
                            @click="onClickContragent(contragent.id)"
                        >
                            <div class="contragents__item-cell m--name">
                                {{ contragent.name }}
                                <div class="m--name-city">{{ contragent.city }}</div>
                            </div>
                            <div class="contragents__item-cell m--activity">
                                {{ contragent.activity }}
                            </div>
                            <div class="contragents__item-cell m--customer">
                                {{ contragent.customer }}
                            </div>
                            <div class="contragents__item-cell m--member">
                                {{ contragent.member }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from '@/components/app-breadcrumbs.vue';

    export default {
        components: {
            Breadcrumbs
        },
        data() {
            return {
                contragents: [{
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                }, {
                    id: 2,
                    name: 'ООО “Газпромнефть-Региональные Продажи”',
                    city: 'г. Челябинск',
                    activity: 'Торговля оптовая моторным топливом, включая авиационный бензин',
                    customer: '1',
                    member: '145'
                }, {
                    id: 3,
                    name: 'ООО “Аэрофлот”',
                    city: 'г. Челябинск',
                    activity: 'Перевозка воздушным пассажирским транспортом, подчиняющимся расписанию',
                    customer: '11',
                    member: '5'
                }]
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
