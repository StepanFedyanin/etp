<template>
    <div class="m--group field__input-counter">
        <button 
            class="field__input-counter-btn button button-red m--minus"
            @click.prevent="changeCounter(-1)"
        />
        <input
            v-maska
            :data-maska="'0'"
            :data-maska-tokens="'0:\\d:multiple'"
            :value="props.context._value"
            :disabled="disabled"
            :readonly="readonly"
            type="text"
            :placeholder="placeholder"
            @maska="handleMaska"
        >
        <button 
            class="field__input-counter-btn button button-green m--plus"
            @click.prevent="changeCounter(1)"
        />
    </div>
</template>

<script setup>
    import { defineProps, ref, onUpdated, computed } from 'vue';
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
    const min = +props.context.min || null;
    const max = +props.context.max || null;
    //const required = props.context.validatin === 'required' && 'required';

    function handleMaska($event) {
        let value = +$event.target.value || 0;
        if (min && value < min) value = min;
        if (max && value > max) value = max;
        props.context.node.input(value);
    }

    function changeCounter(step) {
        //console.log('handleInput', $event.target.disabled)
        let value = +props.context._value + (+step);
        if (min && value < min) value = min;
        if (max && value > max) value = max;
        props.context.node.input(value);
    }
</script>