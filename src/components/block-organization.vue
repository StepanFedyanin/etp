<template>
    <div
        :class="blockClass" 
        class="organization"
    >
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
            <div class="organization__block-col">
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
</template>

<script>
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            organization: {
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
