<template>
    <input
        v-maska="maska"
        :value="props.context._value"
        :disabled="disabled"
        :readonly="readonly"
        type="text"
        :placeholder="placeholder"
        @maska="handleMaska"
    >
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    const maska = props.context.maska;
    const placeholder = props.context.placeholder || '';
    const disabled = props.context.disabled || false;
    const readonly = props.context.readonly || false;

    function handleMaska($event) {
        console.log('handleInput', $event.target.disabled)
        props.context.node.input($event.target.value)
    }
</script>