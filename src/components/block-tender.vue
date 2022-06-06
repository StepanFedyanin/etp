<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div class="tenders__item-left">
            <div class="tenders__item-title">
                Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)
            </div>
            <div class="tenders__item-param">
                <span>Заказчик:</span> <a href="#">ООО «Екатеринбургский Цементный Завод»</a>
            </div>
            <div class="tenders__item-param">
                <span>Категории:</span> Автомобильное оборудование
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
                805 800 ₽
            </div>
            <div class="tenders__item-param">
                <span>Аукцион №1234567</span>
            </div>
            <div class="tenders__item-param">
                <span>Объявлено:</span> 10.03.2022 11:59 МСК
            </div>
            <div class="tenders__item-param">
                <span>Тип аукциона:</span> Открытый
            </div>
            <div class="tenders__item-param">
                <span>Лоты:</span> 35
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
            class="tenders__item-toggle"
            :class="{'tenders__item-toggle--active': isShowPositions}"
            @click="isShowPositions = !isShowPositions"
            v-text="isShowPositions ? 'Скрыть информацию' : 'Показать информацию'"
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
