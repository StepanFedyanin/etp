<template>
    <modal
        :is-shown="!!error"
        @hide="hideError"
    >
        <h3
            slot="header"
            class="modal__header h2"
        >
            Произошла ошибка
        </h3>
        <div
            slot="content"
            class="modal__content text"
        >
            <p v-for="message in errorMessages">
                {{ message }}
            </p>
            <p>
                <strong>Для получения дополнительной информации обратитесь в отдел сопровождения</strong>
            </p>
        </div>
        <div
            slot="footer"
            class="modal__panel"
        >
            <button
                class="modal__prev button button--yellow"
                @click="reportError"
            >
                Отправить отчет
            </button>
            <button
                class="modal__next button button--red"
                @click="hideError"
            >
                Закрыть
            </button>
        </div>
    </modal>
</template>

<script>
    // import { logger } from '@/services';
    import modal from '@/components/modal.vue';

    export default {
        components: {
            modal
        },
        computed: {
            error() {
                return this.$store.state.error;
            },
            errorMessages() {
                let messages = [];
                if (this.error && this.error.err) {
                    let err = this.error.err;
                    do {
                        messages.push(err.message);
                        err = err.parent;
                    } while (err);
                }
                return messages;
            }
        },
        methods: {
            reportError() {
                if (this.error) {
                    // logger.report(this.error);
                    this.hideError();
                }
            },
            hideError() {
                this.$store.dispatch('hideError');
            }
        }
    };
</script>
