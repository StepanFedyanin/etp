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
                        {{ organization.name }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Полное название организации:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.full_name }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Основной вид деятельности:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.principal_activity ? organization.principal_activity : '-' }}      
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Руководитель:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.head_name }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Должность:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.head_post }} 
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Юридический адрес:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.legal_address }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Фактический адрес:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.actual_address }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        ФИО бухгалтера:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.accountant_name ? organization.accountant_name : '-' }}                        
                    </div>
                </div>
            </div>
            <div class="organization__block-col">
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Рейтинг светофора:
                    </div>
                    <div
                        class="organization__block-item-value"
                        :class="[organization.color_status !== 'green' ? organization.color_status == 'yellow' ? 'm--color-yellow' : 'm--color-red' : 'm--color-green' ]"
                    >
                        {{ organization.color_status_text }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Статус ЕГРЮЛ:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.status }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Дата регистрации:
                    </div>
                    <div class="organization__block-item-value">
                        {{ $helpers.parseDate(organization.date_registration, 'YYYY-MM-DD').toLocaleDateString('ru') }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        Уставной капитал:
                    </div>
                    <div class="organization__block-item-value">
                        {{ $helpers.toPrice(organization.capital) }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        ИНН:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.inn }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        КПП:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.kpp }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        ОКПО:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.okpo }}
                    </div>
                </div>
                <div class="organization__block-item">
                    <div class="organization__block-item-name">
                        ОГРН:
                    </div>
                    <div class="organization__block-item-value">
                        {{ organization.ogrn }}
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
