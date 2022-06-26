<template>
    <div class="tender__lots lots m--tender">
        <div class="tender__lots-title">
            Лоты
        </div>
        <div class="lots__filter">
            <div class="lots__filter-block">
                Фильтр:
                <a
                    href="#"
                    class="lots__filter-item is-active"
                >Показать все</a>
                <a
                    href="#"
                    class="lots__filter-item"
                >Участвую</a>
                <a
                    href="#"
                    class="lots__filter-item"
                >Не участвую</a>
            </div>
            <div class="lots__filter-block m--right">
                Сортировка:
                <a
                    href="#"
                    class="lots__filter-item is-active"
                >По участию</a>
                <a
                    href="#"
                    class="lots__filter-item"
                >По номеру лота</a>
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
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            AddLotOffer(id) {
                this.$emit('AddLotOffer', id);
            }
        },
    };
</script>
