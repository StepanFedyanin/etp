<template>
    <div>
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
                <div class="tender__status-subtitle">
                    Документация участника
                </div>
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
                <div class="tender__status-subtitle">
                    Комментарий участника
                </div>
                <div class="tender__status-comment">
                    ООО «Флексайтс». Разработка, продвижение, развитие — делаем сайты с умом! Мы с большим уважением относимся к деньгам, которые доверяют нам клиенты. При работе мы рассчитываем на такое же отношение со стороны клиентов к нашему труду, времени и квалификации. https://flexites.org/
                </div>
            </div>
            <div class="tender__status-block">
                <div class="tender__status-subtitle">
                    Решение организатора <span class="m--color-red">Заявка отклонена</span>
                </div>
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
        },
    };
</script>
