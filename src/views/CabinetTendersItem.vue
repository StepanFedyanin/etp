<template>
    <div class="cabinet tender">
        <div class="container">
            <div class="tender__block">
                <div class="tender__data">
                    <div class="tender__data-icon m--timer m--red" />
                    <div class="tender__data-inner">
                        <div class="tender__data-title">
                            Осталось времени
                        </div>
                        <div class="tender__data-info">
                            1 день 23 часа
                        </div>
                    </div>
                </div>
                <div class="tender__data">
                    <div class="tender__data-icon m--status" />
                    <div class="tender__data-inner">
                        <div class="tender__data-title">
                            Статус
                        </div>
                        <div class="tender__data-info">
                            Проведение аукциона
                        </div>
                    </div>
                </div>
                <div class="tender__data">
                    <div class="tender__data-icon m--clock" />
                    <div class="tender__data-inner">
                        <div class="tender__data-title">
                            Продолжительность
                        </div>
                        <div class="tender__data-info">
                            72:12:12 <span class="m--color-green">+20 минут</span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="tender__info"
            >
                <div class="tender__info-left">
                    <div class="tender__info-title">
                        Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) Поставка инструмента для нужд ООО "Газпром МКС" в 2022 году (для субъектов малого и среднего предпринимательства) (БАА 22862)
                    </div>
                    <div class="tender__info-param">
                        <span>Заказчик:</span> <a href="#">ООО «Екатеринбургский Цементный Завод»</a>
                    </div>
                    <div class="tender__info-param">
                        <span>Категории:</span> Автомобильное оборудование
                    </div>
                    <div class="tender__info-param">
                        <span>Регион:</span> Свердловская область
                    </div>
                    <div class="tender__info-param">
                        <span>Дополнительная информация:</span> Оплата 50% до поставки, 50% после поставки. Внимательно ознакомьтесь с техническим заданием.
                    </div>
                </div>
                <div class="tender__info-right">
                    <div class="tender__info-price">
                        805 800 ₽
                    </div>
                    <div class="tender__info-param">
                        <span>Аукцион №1234567</span>
                    </div>
                    <div class="tender__info-param">
                        <span>Объявлено:</span> 10.03.2022 11:59 МСК
                    </div>
                    <div class="tender__info-param">
                        <span>Тип аукциона:</span> Открытый
                    </div>
                    <div class="tender__info-param">
                        <span>Минимальный шаг ставки:</span> 5
                    </div>
                    <div class="tender__info-param">
                        <span>Лоты:</span> 35
                    </div>
                </div>
            </div>

            <div class="tender__block">
                <div
                    class="tender__docs"
                >
                    <div class="tender__docs-title">
                        Документы:
                    </div>
                    <div class="tender__docs-list">
                        <div class="tender__docs-item">
                            <div class="tender__docs-cell m--title">
                                Файл
                            </div>
                            <div class="tender__docs-cell m--title">
                                Описание
                            </div>
                        </div>
                        <div class="tender__docs-item">
                            <a
                                href="#"
                                class="tender__docs-cell m--file"
                            >Требование к материалам.pdf</a>
                            <div class="tender__docs-cell m--desc">
                                Описание объекта закупки
                            </div>
                        </div>
                        <div class="tender__docs-item">
                            <a
                                href="#"
                                class="tender__docs-cell m--file"
                            >Приложение 1.pdf</a>
                            <div class="tender__docs-cell m--desc">
                                Пример приложения с каким-то текстом
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="tender__contact"
                >
                    <div class="tender__contact-title">
                        Контактное лицо
                    </div>
                    <div class="tender__contact-param">
                        <span>Менеджер:</span> Анатольев Иван Иванович
                    </div>
                    <div class="tender__contact-param">
                        <span>Телефон:</span> +7 333 333 33 33
                    </div>
                    <div class="tender__contact-param">
                        <span>E-mail:</span> yandex@yandex.ru
                    </div>
                </div>
            </div>

            <div class="tender__status">
                <div class="tender__status-title">
                    Статус вашей организации: не участвует в тендере
                </div>
                <div class="tender__status-block">
                    <button 
                        class="button button-green"
                        @click="onClickRequest()"
                    >
                        Подать заявку
                    </button>
                </div>
            </div>

            <div class="tender__status">
                <div class="tender__status-title">
                    Статус вашей организации: <span>Заявка на рассмотрении</span>
                </div>
                <div class="tender__status-block">
                    <button 
                        class="button button-green"
                        disabled
                        @click="onClickRequest()"
                    >
                        Подать заявку
                    </button>
                </div>
            </div>

            <div class="tender__status">
                <div class="tender__status-title">
                    Статус вашей организации: <span class="m--color-red">Заявка отклонена</span>
                </div>
                <div class="tender__status-block m--underline tender__docs">
                    <div class="tender__status-subtitle">Документация участника</div>
                    <div class="tender__docs-list">
                        <div class="tender__docs-item m--width-30-70">
                            <div class="tender__docs-cell m--title">
                                Файл
                            </div>
                            <div class="tender__docs-cell m--title">
                                Описание
                            </div>
                        </div>
                        <div class="tender__docs-item m--width-30-70">
                            <a
                                href="#"
                                class="tender__docs-cell m--file"
                            >Требование к материалам.pdf</a>
                            <div class="tender__docs-cell m--desc">
                                Описание объекта закупки
                            </div>
                        </div>
                        <div class="tender__docs-item m--width-30-70">
                            <a
                                href="#"
                                class="tender__docs-cell m--file"
                            >Приложение 1.pdf</a>
                            <div class="tender__docs-cell m--desc">
                                Пример приложения с каким-то текстом
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tender__status-block m--underline">
                    <div class="tender__status-subtitle">Комментарий участника</div>
                    <div class="tender__status-comment">
                        ООО «Флексайтс». Разработка, продвижение, развитие — делаем сайты с умом! Мы с большим уважением относимся к деньгам, которые доверяют нам клиенты. При работе мы рассчитываем на такое же отношение со стороны клиентов к нашему труду, времени и квалификации. https://flexites.org/
                    </div>
                </div>
                <div class="tender__status-block">
                    <div class="tender__status-subtitle">Решение организатора <span class="m--color-red">Заявка отклонена</span></div>
                    <div class="tender__status-comment">
                        Приложите лицензию на осуществление медицинской деятельности.
                    </div>
                </div>
                <div class="tender__status-block">
                    <button 
                        class="button button-green"
                        @click="onClickRequest()"
                    >
                        Подать заявку снова
                    </button>
                </div>
            </div>

            <div class="tender__bids">
                <div class="tender__bids-title">
                    Быстрые ставки
                </div>
                <div class="tender__bids-block">
                    <div class="tender__bids-info">Минимальный шаг цены - 0,7 %</div>
                    <button 
                        class="button button-outline-green m--right"
                        @click="onClickRequest()"
                    >
                        По проигрывающим лотам
                    </button>
                    <button 
                        class="button button-outline-green"
                        @click="onClickRequest()"
                    >
                        По всем лотам
                    </button>
                </div>
            </div>

            <div class="tender__lots lots m--tender">
                <div class="tender__lots-title">Лоты</div>
                <div class="lots__filter">
                    <div class="lots__filter-block">
                        Фильтр:
                        <a href="#" class="lots__filter-item is-active">Показать все</a>
                        <a href="#" class="lots__filter-item">Участвую</a>
                        <a href="#" class="lots__filter-item">Не участвую</a>
                    </div>
                    <div class="lots__filter-block m--right">
                        Сортировка:
                        <a href="#" class="lots__filter-item is-active">По участию</a>
                        <a href="#" class="lots__filter-item">По номеру лота</a>
                    </div>
                </div>

                <div class="lots__block">
                    <div class="lots__item lots__block-item m--no-grid">
                        <div class="lots__item-header">
                            Лот №1
                            <div class="lots__item-status m--color-red">Ставка проигрывает</div>
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
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>

                    <div class="lots__item lots__block-item m--no-grid">
                        <div class="lots__item-header">
                            Лот №1
                            <div class="lots__item-status m--color-red">Ставка проигрывает</div>
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
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>

                    <div class="lots__item lots__block-item m--no-grid">
                        <div class="lots__item-header">
                            Лот №1
                            <div class="lots__item-status m--color-green">Ставка выигрывает</div>
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
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>

                    <div class="lots__item lots__block-item m--no-grid">
                        <div class="lots__item-header">
                            Лот №1
                            <div class="lots__item-status">Вы не участвуете</div>
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
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tender__lots lots">
                <div class="lots__header">
                    <div class="lots__header-cell m--position">
                        №
                    </div>
                    <div class="lots__header-cell m--name">
                        Название
                    </div>
                    <div class="lots__header-cell m--nums">
                        Кол/во
                    </div>
                    <div class="lots__header-cell m--unit">
                        ед.изм
                    </div>
                    <div class="lots__header-cell m--price">
                        Цена за ед. с НДС
                    </div>
                    <div class="lots__header-cell m--sum">
                        Сумма, с учетом НДС
                    </div>
                    <div class="lots__header-cell m--member">
                        Участник с лучшей ставкой
                    </div>
                    <div class="lots__header-cell m--bet">
                        Лучшая ставка
                    </div>
                </div>
                <div class="lots__list">
                    <div class="lots__item">
                        <div class="lots__item-cell m--position">
                            1
                        </div>
                        <div class="lots__item-cell">
                            Запчасть №1
                        </div>
                        <div class="lots__item-cell">
                            20
                        </div>
                        <div class="lots__item-cell">
                            кг.
                        </div>
                        <div class="lots__item-cell">
                            600,55
                        </div>
                        <div class="lots__item-cell">
                            12 600,55
                        </div>
                        <div class="lots__item-cell">
                            ООО “Флексайтс”
                        </div>
                        <div class="lots__item-cell m--bet">
                            10 600,55
                        </div>
                    </div>
                    <div class="lots__item">
                        <div class="lots__item-cell m--position">
                            1
                        </div>
                        <div class="lots__item-cell">
                            Запчасть №1
                        </div>
                        <div class="lots__item-cell">
                            20
                        </div>
                        <div class="lots__item-cell">
                            кг.
                        </div>
                        <div class="lots__item-cell">
                            600,55
                        </div>
                        <div class="lots__item-cell">
                            12 600,55
                        </div>
                        <div class="lots__item-cell">
                            ООО “Флексайтс”
                        </div>
                        <div class="lots__item-cell m--bet">
                            10 600,55
                        </div>
                    </div>
                </div>
            </div>

            <div class="tender__lots lots m--with-button">
                <div class="lots__header">
                    <div class="lots__header-cell m--position">
                        №
                    </div>
                    <div class="lots__header-cell m--name">
                        Название
                    </div>
                    <div class="lots__header-cell m--nums">
                        Кол/во
                    </div>
                    <div class="lots__header-cell m--unit">
                        ед.изм
                    </div>
                    <div class="lots__header-cell m--price">
                        Цена за ед. с НДС
                    </div>
                    <div class="lots__header-cell m--sum">
                        Сумма, с учетом НДС
                    </div>
                    <div class="lots__header-cell m--button">
                        Участие
                    </div>
                </div>
                <div class="lots__list">
                    <div class="lots__item">
                        <div class="lots__item-cell m--position">
                            1
                        </div>
                        <div class="lots__item-cell">
                            Запчасть №1
                        </div>
                        <div class="lots__item-cell">
                            20
                        </div>
                        <div class="lots__item-cell">
                            кг.
                        </div>
                        <div class="lots__item-cell">
                            600,55
                        </div>
                        <div class="lots__item-cell">
                            12 600,55
                        </div>
                        <div class="lots__item-cell m--button">
                            <button 
                                class="button button-green"
                                @click="onClickAddLotOffer()"
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>
                    <div class="lots__item">
                        <div class="lots__item-cell m--position">
                            1
                        </div>
                        <div class="lots__item-cell">
                            Запчасть №1
                        </div>
                        <div class="lots__item-cell">
                            20
                        </div>
                        <div class="lots__item-cell">
                            кг.
                        </div>
                        <div class="lots__item-cell">
                            600,55
                        </div>
                        <div class="lots__item-cell">
                            12 600,55
                        </div>
                        <div class="lots__item-cell m--button">
                            <button 
                                class="button button-green"
                                @click="onClickAddLotOffer()"
                            >
                                Сделать ставку
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tender__block">
                <div class="tender__offers offers">
                    <div class="offers__title">
                        Ваши предложения
                    </div>
                    <div class="offers__list">
                        <div class="offers__item">
                            <div class="offers__item-name">Запчасть №1</div>
                            <div class="offers__item-info">
                                <div class="offers__item-param">
                                    Начальная цена <span>22 000,00 ₽</span>
                                </div>
                                <div class="offers__item-param m--color-red">
                                    Текущая цена <span>17 900,00 ₽</span>
                                </div>
                                <div class="offers__item-param">
                                    Текущее снижение <span>20.1 %</span>
                                </div>
                                <div class="offers__item-param">
                                    Ваше последнее ценовое предложение <span>20 000,00 ₽</span>
                                </div>
                                <div class="offers__item-param">
                                    Ваша текущая позиция <span>3</span>
                                </div>
                            </div>
                            <div class="offers__item-button">
                                <a 
                                    href="#"
                                    class="button button-outline-green" 
                                >
                                    Обновить ставку
                                </a>
                            </div>
                        </div>
                        <div class="offers__item">
                            <div class="offers__item-name">Запчасть №1</div>
                            <div class="offers__item-info">
                                <div class="offers__item-param">
                                    Начальная цена <span>22 000,00 ₽</span>
                                </div>
                                <div class="offers__item-param m--color-red">
                                    Текущая цена <span>17 900,00 ₽</span>
                                </div>
                                <div class="offers__item-param">
                                    Текущее снижение <span>20.1 %</span>
                                </div>
                                <div class="offers__item-param">
                                    Ваше последнее ценовое предложение <span>20 000,00 ₽</span>
                                </div>
                                <div class="offers__item-param">
                                    Ваша текущая позиция <span>3</span>
                                </div>
                            </div>
                            <div class="offers__item-button">
                                <a 
                                    href="#"
                                    class="button button-outline-green" 
                                >
                                    Обновить ставку
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="offers__more">
                        <a 
                            href="#"
                            class="button button-green" 
                        >
                            Cмотреть все
                        </a>
                    </div>
                </div>
                <div class="tender__stats offers">
                    <div class="offers__title">
                        Лучшие предложения
                    </div>
                    <div class="offers__stats">
                        <div class="offers__stats-item">
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--lot-name">Запчасть №1</div>
                                <div class="offers__stats-param m--name">ООО “Ромашка”</div>
                                <div class="offers__stats-param m--price-best">20 865,00</div>
                            </div>
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--progress m--green">
                                    <span style="width:80%" />
                                </div>
                                <div class="offers__stats-param m--price">23 865,00</div>
                            </div>  
                        </div>
                        <div class="offers__stats-item">
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--lot-name">Запчасть №3</div>
                                <div class="offers__stats-param m--name">ООО “Ромашка”</div>
                                <div class="offers__stats-param m--price-best">20 865,00</div>
                            </div>
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--progress m--green">
                                    <span style="width:80%" />
                                </div>
                                <div class="offers__stats-param m--price">23 865,00</div>
                            </div>  
                        </div>
                        <div class="offers__stats-item">
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--lot-name">Запчасть №4</div>
                                <div class="offers__stats-param m--name">ООО “Ромашка”</div>
                                <div class="offers__stats-param m--price-best">20 865,00</div>
                            </div>
                            <div class="offers__stats-item-block">
                                <div class="offers__stats-param m--progress m--red">
                                    <span style="width:80%" />
                                </div>
                                <div class="offers__stats-param m--price">23 865,00</div>
                            </div>  
                        </div>
                    </div>
                    <div class="offers__more">
                        <a 
                            href="#"
                            class="button button-green" 
                        >
                            Cмотреть все
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <ModalAddLotOffer
            :showModal="showAddLotOfferModal"
            @hideModal="hideAddLotOfferModal"
        />
    </div>
</template>

<script>
    import ModalAddLotOffer from '@/components/modal-add-lot-offer.vue';

    export default {
        components: {
            ModalAddLotOffer
        },
        data() {
            return {
                showAddLotOfferModal: false
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickAddLotOffer() {
                this.showAddLotOfferModal = true;
            },
            hideAddLotOfferModal() {
                this.showAddLotOfferModal = false;
            }
        }
    };
</script>
