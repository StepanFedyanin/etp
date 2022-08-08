<template>
    <div class="organization__item">
        <div 
            class="organization__box"
            :class="organization.color_status"
        >
            <div class="organization__options ">
                <div class="option">
                    <span>ИНН </span><span class="option--bold">{{ organization.inn }}</span> 
                </div>
                <div
                    v-if="organization.kpp" 
                    class="option"
                >
                    <span>КПП </span><span class="option--bold"> {{ organization.kpp }}</span>
                </div>
            </div>
            <div class="organization__options">
                <div class="option">
                    {{ organization.name }}{{ organization.filial ? ", филиал" : "" }}
                </div>
                <div class="option">
                    {{ organization.legal_address }}
                </div>
            </div>
        </div>
        <button
            v-if="organization.color_status !== 'red'"
            class="button button-green"
            @click="onClickRegister"
        >
            Зарегистрироваться
        </button>
    </div>
</template>
<script>
    export default {
        props: {
            organization: {
                type: Object,
                default() { return {} }
            },
        },
        data() {
            return {}
        },
        methods: {
            onClickRegister() {
                this.$emit('registerCompany', this.organization);
            },
        }
    }
</script>