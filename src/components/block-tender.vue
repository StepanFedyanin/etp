<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div class="tenders__item-favorite" />
        <div class="tenders__item-left">
            <div class="tenders__item-title">
                {{ tender.name }}
            </div>
            <div class="tenders__item-param">
                <span>Заказчик:</span> <a href="#">ООО «Екатеринбургский Цементный Завод»</a>
            </div>
            <div class="tenders__item-param">
                <span>Категории:</span>
                <span
                    v-for="(category, idx) in tender.category"
                    :key="category.id"
                >
                    {{ category.name }}
                    <span v-if="idx != Object.keys(tender.category).length - 1">, </span>
                </span>
            </div>
            <div class="tenders__item-param">
                <span>Регион:</span> Свердловская область
            </div>
            <div
                v-if="whole"
                class="tenders__item-docs"
            >
                <div class="tenders__item-docs__title">
                    Документы:
                </div>
                <div class="tenders__item-docs__list">
                    <div class="tenders__item-docs__item">
                        <div class="tenders__item-docs__cell m--title">
                            Файл
                        </div>
                        <div class="tenders__item-docs__cell m--title">
                            Описание
                        </div>
                    </div>
                    <div class="tenders__item-docs__item">
                        <a
                            href="#"
                            class="tenders__item-docs__cell m--file"
                        >Требование к материалам.pdf</a>
                        <div class="tenders__item-docs__cell m--desc">
                            Описание объекта закупки
                        </div>
                    </div>
                    <div class="tenders__item-docs__item">
                        <a
                            href="#"
                            class="tenders__item-docs__cell m--file"
                        >Приложение 1.pdf</a>
                        <div class="tenders__item-docs__cell m--desc">
                            Пример приложения с каким-то текстом
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ $helpers.toPrice(tender.price, {pointer: ',', sign: '₽'}) }}
            </div>
            <div class="tenders__item-param">
                <span>Аукцион №1234567</span>
            </div>
            <div class="tenders__item-param">
                <span>Объявлено:</span> 10.03.2022 11:59 МСК
            </div>
            <div class="tenders__item-param">
                <span>Тип аукциона:</span> {{ tender.type }}
            </div>
            <div class="tenders__item-param">
                <span>Лоты:</span> {{ tender.lot_count }}
            </div>
            <div class="tenders__item-param">
                <span>Предложений от поставщиков:</span> 5
            </div>
            <div
                v-if="whole"
                class="tenders__item-timer"
            >
                <div class="tenders__item-timer-date">
                    Прием заявок: до 21.03.2022 11:59 МСК
                </div>
                <div class="tenders__item-timer-left">
                    Осталось 1 день 23 часа
                </div>
            </div>
            <div class="tenders__item-participate">
                <button
                    class="button button-green"
                    @click="onClickParticipate(tender.id)"
                >
                    Участвовать
                </button>
            </div>
        </div>
        <div
            v-if="whole"
            class="tenders__item-lots lots m--tenders"
            :class="{'m--active': isShowPositions}"
        >
            <div class="lots__header">
                <div class="lots__header-cell m--position">
                    №
                </div>
                <div class="lots__header-cell m--name">
                    Описание
                </div>
                <div class="lots__header-cell m--nums">
                    Кол/во
                </div>
                <div class="lots__header-cell m--unit">
                    ед.изм
                </div>
            </div>
            <div class="lots__list">
                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        1
                    </div>
                    <div class="lots__item-cell">
                        Цемент М 500, 50 кг. (штука)
                    </div>
                    <div class="lots__item-cell">
                        20
                    </div>
                    <div class="lots__item-cell">
                        кг.
                    </div>
                </div>
                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        2
                    </div>
                    <div class="lots__item-cell">
                        Цемент строительный
                    </div>
                    <div class="lots__item-cell">
                        200
                    </div>
                    <div class="lots__item-cell">
                        шт.
                    </div>
                </div>
                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        3
                    </div>
                    <div class="lots__item-cell">
                        Цемент строительный
                    </div>
                    <div class="lots__item-cell">
                        200
                    </div>
                    <div class="lots__item-cell">
                        шт.
                    </div>
                </div>
                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        4
                    </div>
                    <div class="lots__item-cell">
                        Цемент строительный
                    </div>
                    <div class="lots__item-cell">
                        200
                    </div>
                    <div class="lots__item-cell">
                        шт.
                    </div>
                </div>

                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        5
                    </div>
                    <div class="lots__item-cell">
                        Цемент строительный
                    </div>
                    <div class="lots__item-cell">
                        200
                    </div>
                    <div class="lots__item-cell">
                        шт.
                    </div>
                </div>
                <div class="lots__item">
                    <div class="lots__item-cell m--position">
                        6
                    </div>
                    <div class="lots__item-cell">
                        Цемент строительный
                    </div>
                    <div class="lots__item-cell">
                        200
                    </div>
                    <div class="lots__item-cell">
                        шт.
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="whole"
            class="tenders__item-toggle"
            :class="{'tenders__item-toggle--active': isShowPositions}"
            @click="isShowPositions = !isShowPositions"
            v-text="isShowPositions ? 'Скрыть 1 позицию' : 'Показать 1 позицию'"
        />
    </div>
</template>

<script>
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    id: 1
                }; }
            },
            whole: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                isShowPositions: false
            };
        },
        methods: {
            onClickParticipate(id) {
                this.$router.push({ name: 'tender', params: { id: id } });
            }
        }
    };
</script>
