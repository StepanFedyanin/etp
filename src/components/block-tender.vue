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
        </div>
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
                default() { return {}; }
            },
        },
        data() {
            return {
            };
        },
        methods: {
        }
    };
</script>
