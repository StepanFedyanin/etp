<template>
    <vue-final-modal 
        v-model="showModal"
        classes="modal__container" 
        content-class="modal__block"
    >
        <button 
            class="modal__close" 
            @click="hideModal"
        >
            <span />
        </button>
        <span class="modal__title">Произошла ошибка</span>
        <div class="modal__content">
            <template
                v-if="errorMessages.length"
            >
                <p 
                    v-for="(message, index) in errorMessages"
                    :key="index"
                    class="m--color-red"
                >
                    {{ message }}
                </p>
            </template>
            <template
                v-else
            >
                <p class="m--color-red">
                    {{ error }}
                </p>
            </template>
        </div>
        <div
            v-if="footer"
            class="modal__footer"
        />
    </vue-final-modal>
</template>

<script>
    // import { logger } from '@/services';
    export default {
        components: {
        },
        props: {
            footer: {
                type: String,
                default: ''
            },
        },
        computed: {
            showModal() {
                return this.error ? true : false;
            },
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
            },
            errorButton() {
                return this.error.err.button;
            }
        },
        methods: {
            reportError() {
                if (this.error) {
                    // logger.report(this.error);
                    this.hideError();
                }
            },
            hideModal() {
                this.$store.dispatch('hideError');
            }
        }
    };
</script>
