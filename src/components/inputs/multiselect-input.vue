<template>
    <Multiselect
        :value="props.context._value"
        :options="options"
        :mode="mode"
        :searchable="searchable"
        :class="context.classes.multiselect"
        :placeholder="props.context.placeholder"
        :hideSelected="false"
        noOptionsText="Список пуст"
        noResultsText="Результатов не найдено"
        @change="handleSelect"
    />
</template>

<script setup>
    import { defineProps } from 'vue';
    import Multiselect from '@vueform/multiselect';
    const props = defineProps({
        context: Object,
    });

    const options = props.context.options;
    console.log('Options', options)
    const mode = props.context.mode || 'single';
    const searchable = props.context.searchable || false;

    function handleSelect(value, select$) {
        props.context.node.input(value)
    }
</script>