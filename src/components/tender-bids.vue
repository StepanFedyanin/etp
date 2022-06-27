<template>
    <div class="tender__lots lots m--tender">
        <div class="tender__lots-title">
            Лоты
        </div>
        <div class="lots__filter">
            <div class="lots__filter-block">
                Фильтр:
                <a
                    v-for="(item, key) in filters"
                    :key="`filter-${key}`"
                    href="#"
                    class="lots__filter-item"
                    :class="key === currentFilter ? 'is-active' : ''"
                    @click.prevent="changeFilter(key)"
                >
                    {{ item }}
                </a>
            </div>
            <div class="lots__filter-block m--right">
                Сортировка:
                <a
                    v-for="(item, key) in sorting"
                    :key="`sorting-${key}`"
                    href="#"
                    class="lots__filter-item"
                    :class="key === currentSorting ? 'is-active' : ''"
                    @click.prevent="changeSorting(key)"
                >
                    {{ item }}
                </a>
            </div>
        </div>

        <div class="lots__block">
            <div class="lots__item lots__block-item m--no-grid">
                <div class="lots__item-header">
                    Лот №1
                    <div class="lots__item-status m--color-red">
                        Ставка проигрывает
                    </div>
                </div>
                <div class="lots__item-name">
                    Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное название лота, состоящее из большого числа символов, но все символы помещаются
                </div>
                <div class="lots__item-params">
                    <div class="lots__item-param m--underline">
                        20 000 ед. (цистерна)
                        <span>6 000 ₽ / ед.</span>
                    </div>
                    <div class="lots__item-param">
                        Начальная цена:
                        <span>12 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Лучшая ставка:
                        <span>10 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Ваша ставка:
                        <span>11 100 000 ₽</span>
                    </div>
                </div>
                <div class="lots__item-buttons">
                    <button 
                        class="button button-outline-green"
                        @click.stop="AddLotOffer()"
                    >
                        Сделать ставку
                    </button>
                </div>
            </div>

            <div class="lots__item lots__block-item m--no-grid">
                <div class="lots__item-header">
                    Лот №1
                    <div class="lots__item-status m--color-red">
                        Ставка проигрывает
                    </div>
                </div>
                <div class="lots__item-name">
                    Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное название лота, состоящее из большого числа символов, но все символы помещаются
                </div>
                <div class="lots__item-params">
                    <div class="lots__item-param m--underline">
                        20 000 ед. (цистерна)
                        <span>6 000 ₽ / ед.</span>
                    </div>
                    <div class="lots__item-param">
                        Начальная цена:
                        <span>12 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Лучшая ставка:
                        <span>10 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Ваша ставка:
                        <span>11 100 000 ₽</span>
                    </div>
                </div>
                <div class="lots__item-buttons">
                    <button 
                        class="button button-outline-green"
                        @click.stop="AddLotOffer()"
                    >
                        Сделать ставку
                    </button>
                </div>
            </div>

            <div class="lots__item lots__block-item m--no-grid">
                <div class="lots__item-header">
                    Лот №1
                    <div class="lots__item-status m--color-green">
                        Ставка выигрывает
                    </div>
                </div>
                <div class="lots__item-name">
                    Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное название лота
                </div>
                <div class="lots__item-params">
                    <div class="lots__item-param m--underline">
                        20 000 ед. (цистерна)
                        <span>6 000 ₽ / ед.</span>
                    </div>
                    <div class="lots__item-param">
                        Начальная цена:
                        <span>12 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Лучшая ставка:
                        <span>10 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Ваша ставка:
                        <span>11 100 000 ₽</span>
                    </div>
                </div>
                <div class="lots__item-buttons">
                    <button 
                        class="button button-outline-green"
                        @click.stop="AddLotOffer()"
                    >
                        Сделать ставку
                    </button>
                </div>
            </div>

            <div class="lots__item lots__block-item m--no-grid">
                <div class="lots__item-header">
                    Лот №1
                    <div class="lots__item-status">
                        Вы не участвуете
                    </div>
                </div>
                <div class="lots__item-name">
                    Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ
                </div>
                <div class="lots__item-params">
                    <div class="lots__item-param m--underline">
                        20 000 ед. (цистерна)
                        <span>6 000 ₽ / ед.</span>
                    </div>
                    <div class="lots__item-param">
                        Начальная цена:
                        <span>12 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Лучшая ставка:
                        <span>10 000 000 ₽</span>
                    </div>
                    <div class="lots__item-param">
                        Ваша ставка:
                        <span>11 100 000 ₽</span>
                    </div>
                </div>
                <div class="lots__item-buttons">
                    <button 
                        class="button button-outline-green"
                        @click.stop="AddLotOffer()"
                    >
                        Сделать ставку
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
        },
        data() {
            return {
                filters: {
                    all: 'Показать все',
                    participate: 'Участвую',
                    not_participate: 'Не участвую',
                },
                currentFilter: 'all',
                sorting: {
                    participate: 'По участию',
                    lot_number: 'По номеру лота'

                },
                currentSorting: 'participate'
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            changeFilter(key) {
                this.currentFilter = key;
            },
            changeSorting(key) {
                this.currentSorting = key;
            },
            AddLotOffer(id) {
                this.$emit('AddLotOffer', id);
            }
        },
    };
</script>
