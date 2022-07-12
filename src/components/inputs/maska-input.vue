<template>
    <input
        v-maska="maska"
        :value="props.context._value"
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

    function handleMaska($event) {
        //console.log('handleInput', $event.target.value)
        props.context.node.input($event.target.value)
    }
</script>