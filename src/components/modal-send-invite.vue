<template>
    <vue-final-modal
        v-model="show"
        classes="modal__container" 
        content-class="modal__block modal__notice"
    >
        <button 
            class="modal__close" 
            @click="$emit('hideModal')"
        >
            <span />
        </button>
        <svg class="svg-icon svg-icon__sent">
            <use xlink:href="../assets/img/icons/icons.svg#sent" />
        </svg>
        <div class="modal__content">
            <div class="modal__title">{{ text }}</div>
            <div class="modal__text text">
                <p class="text__important">На электронную почту: <span class="text__email">{{ emails }}</span></p>
                <p>Ваши партнеры получат ссылку-приглашение на почту, после чего смогут зарегистрироваться в системе TUGAN.</p>
            </div>
            <button 
                class="button button-green"
                @click="$emit('hideModal')"
            >
                Спасибо!
            </button>
        </div>
    </vue-final-modal>
</template>
<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            text: {
                type: String,
                default(){ return ""; }
            },
            emails: {
                type: String,
                default(){ return ""; }
            }

        },
        data() {
            return {
                showLoaderSending: false,
            }
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        created() {
            // this.emails = [];
        },
        methods: {
            // submitAddLotForm(formData) {
            //     this.$emit('hideModal')
            // }
        },
    }
</script>