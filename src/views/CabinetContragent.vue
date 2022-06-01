<template>
    <div class="app__main">
        <Breadcrumbs />
        <div class="cabinet contragent">
            <div class="container">
                <div class="contragent__title h1">
                    {{ contragent.name }}
                </div>
                <div class="contragent__subtitle h2">
                    Информация о компании
                </div>

                <div class="contragent__block organization">
                    <div class="organization__block">
                        <div class="organization__block-col">
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Название организации:
                                </div>
                                <div class="organization__block-item-value">
                                    ООО "Флексайтс"
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Полное название организации:
                                </div>
                                <div class="organization__block-item-value">
                                    ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ФЛЕКСАЙТС"
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Основной вид деятельности:
                                </div>
                                <div class="organization__block-item-value">
                                    Разработка компьютерного программного обеспечения
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Руководитель:
                                </div>
                                <div class="organization__block-item-value">
                                    Жуков Николай Геннадьевич
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Должность:
                                </div>
                                <div class="organization__block-item-value">
                                    Директор
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Юридический адрес:
                                </div>
                                <div class="organization__block-item-value">
                                    г. Челябинск, ул. Маркса, д. 46, ПОМЕЩ. 12, 454091
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Фактический адрес:
                                </div>
                                <div class="organization__block-item-value">
                                    г. Челябинск, ул. Энтузиастов, д. 11в, оф. 320, 454091
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    ФИО бухгалтера:
                                </div>
                                <div class="organization__block-item-value">
                                    -                            
                                </div>
                            </div>
                        </div>
                        <div class="contragent__block-col">
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Рейтинг светофора:
                                </div>
                                <div class="organization__block-item-value m--color-green">
                                    Зеленый
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Статус Егрюл:
                                </div>
                                <div class="organization__block-item-value">
                                    Действующая
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Дата регистрации:
                                </div>
                                <div class="organization__block-item-value">
                                    20.11.07
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Уставной капитал:
                                </div>
                                <div class="organization__block-item-value">
                                    10 000
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    ИНН:
                                </div>
                                <div class="organization__block-item-value">
                                    7447123326
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    КПП:
                                </div>
                                <div class="organization__block-item-value">
                                    745301001
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    ОКПО:
                                </div>
                                <div class="organization__block-item-value">
                                    82903111
                                </div>
                            </div>
                            <div class="organization__block-item">
                                <div class="organization__block-item-name">
                                    Огрн:
                                </div>
                                <div class="organization__block-item-value">
                                    1077447022575
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contragent__subtitle h2">
                    Представители организации
                </div>
                <div class="contragent__block">
                    <div class="contragent__persons persons">
                        <div class="persons__item m--header">
                            <div class="persons__item-cell">№</div>
                            <div class="persons__item-cell">ФИО представителя</div>
                            <div class="persons__item-cell">Должность</div>
                            <div class="persons__item-cell">Email</div>
                            <div class="persons__item-cell">Телефон</div>
                        </div>
                        <div class="persons__item">
                            <div class="persons__item-cell">1</div>
                            <div class="persons__item-cell">Жуков Николай Геннадьевич</div>
                            <div class="persons__item-cell">Директор</div>
                            <div class="persons__item-cell">info@flexites.org</div>
                            <div class="persons__item-cell">+7 (351) 267-29-94</div>
                        </div>
                        <div class="persons__item">
                            <div class="persons__item-cell">1</div>
                            <div class="persons__item-cell">Жуков Николай Геннадьевич</div>
                            <div class="persons__item-cell">Директор</div>
                            <div class="persons__item-cell">info@flexites.org</div>
                            <div class="persons__item-cell">+7 (351) 267-29-94</div>
                        </div>
                    </div>
                </div>
                <div class="contragent__subtitle h2">
                    Заказчик <span class="m--color-green">16 тендеров</span>
                </div>
                <div class="contragent__tenders tenders">
                    <div class="tenders__item">
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
                contragent: {
                    id: 1,
                    name: 'ООО “Флексайтс”',
                    city: 'г. Челябинск',
                    activity: 'Разработка компьютерного программного обеспечения',
                    customer: '113',
                    member: '45'
                }
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
