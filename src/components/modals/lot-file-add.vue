<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal')"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal')"
            >
                <span />
            </button>
            <span class="modal__title">Добавить лот из файла</span>
            <div class="modal__content">
                <div class="modal__description text">
                    Заполните XLS-таблицу по шаблону, представленному ниже. Каждый лот
                    <br>
                    должен располагаться в отдельной строке. Количество лотов не ограничено.
                </div>
                <div>
                    <a
                        href="#"
                        class="modal__link"
                    >
                        Скачать шаблон файла (XLS)
                    </a>
                </div>
                <div
                    class="modal__actions"
                >
                    <input
                        id="fileInput"
                        ref="fileInput"
                        type="file"
                        class="field--type_hidden"
                        accept=".xls,.xlsx"
                    >
                    <button
                        class="button button-outline-green"
                        @click="onClickUploadFileLots"
                    >
                        Загрузить файл
                    </button>
                </div>
                <div class="modal__description text">
                    После загрузки все лоты будут проверены системой и добавлены к уже
                    <br>
                    имеющимся лотам.
                </div>
                <div class="modal__actions">
                    <button class="button button-red">
                        Отменить
                    </button>
                    <button class="button button-green">
                        Сохранить
                    </button>
                </div>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            data: {
                type: Object,
                default() { return null; }
            },
        },
        data() {
            return {
                showLoaderSending: false,
                file: null
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        mounted() {    
        },
        methods: {
            onClickUploadFileLots() {
                let fileInput = this.$refs.fileInput
                let click = new MouseEvent("click")

                fileInput.onchange = this.uploaFileComplete
                fileInput.dispatchEvent(click)
            },
            uploaFileComplete(event) {
                // this.file = event.target.files ? event.target.files[0] : null
                // if (this.file) {

                // }
            }
            // this.$emit('hideModal')
        },
    };
</script>
