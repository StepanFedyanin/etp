<template>
    <vue-final-modal
        v-model="show"
        classes="modal-container"
        content-class="modal-content"
    >
        <button class="modal__close" @click="show = false">
            <mdi-close></mdi-close>
        </button>
        <span class="modal__title">Ваше приглашение отправлено!</span>
        <div class="modal__content">
            <p>На электронную почту: ivan@yandex.ru, artem@mail.ru, info@flexites.org.</p>
            <p>Ваши партнеры получат ссылку-приглашение на почту, после чего смогут зарегистрироваться в системе TUGAN.</p>
        </div>
        <button @click="$emit('hideModal')">Спасибо!</button>
    </vue-final-modal>
</template>
<script>
    export default {
        props: {
            // showModal: false,
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            // data: {
            //     type: Object,
            //     default() { return null; }
            // },
        },
        data() {
            return {
                showLoaderSending: false,
                // showModal: false,
            }
        },
        computed: {
            show() {
                return this.showModal;
            },
            // hide(){
            //     return this.hideModal;
            // }
        },
        methods: {
            // submitAddLotForm(formData) {
            //     this.$emit('hideModal')
            // }
        },
    }
</script>