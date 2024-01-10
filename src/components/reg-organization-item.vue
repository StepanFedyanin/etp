<template>
    <div 
        :class="['organization__item', organization.color_status === 'red' ? 'm--disabled' : '']"
    >
        <div 
            :class="['organization__item-box', `m--${organization.color_status}`]"
            @click.prevent="organization.color_status !== 'red' ? onClickRegister() : null"
        >
            <div class="organization__item-options">
                <div class="organization__item-option">
                    <span>ИНН </span><strong>{{ organization.inn }}</strong> 
                </div>
                <div
                    v-if="organization.kpp" 
                    class="organization__item-option"
                >
                    <span>КПП </span><strong> {{ organization.kpp }}</strong>
                </div>
            </div>
            <div class="organization__item-options">
                <div class="organization__item-option">
                    {{ organization.name }}{{ organization.filial ? ", филиал" : "" }}
                </div>
                <div class="organization__item-option">
                    {{ organization.legal_address }}
                </div>
            </div>
        </div>
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
                console.log('onClickRegister');
                this.$emit('registerCompany', this.organization);
            },
        }
    }
</script>