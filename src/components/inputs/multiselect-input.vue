<template>
    <Multiselect
        ref="multiselect"
        v-model="vModelValue"
        :value="props.context._value"
        :options="options"
        :mode="mode"
        :object="object"
        :multipleLabel="multipleLabel"
        :searchable="searchable"
        :groups="groups"
        :class="context.classes.multiselect"
        :placeholder="props.context.placeholder"
        :hideSelected="false"
        :close-on-select="closeOnSelect"
        :resolve-on-load="resolveOnLoad"
        :noOptionsText="noOptionsText"
        noResultsText="Результатов не найдено"
        @change="handleSelect"
        @search-change="searchChange"
    />
</template>

<script setup>
    import { defineProps, ref, onUpdated } from 'vue';
    import Multiselect from '@vueform/multiselect';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    // console.log('Options', options)
    const options = props.context.options;
    const multiselect = ref(null)
    const mode = props.context.mode || 'single';
    const searchable = props.context.searchable || false;
    const groups = props.context.attrs.groups || false;
    const multipleLabel = props.context.multipleLabel || multipleLabelFunc;
    const searchChange = props.context.attrs["search-change"] || handleSearchChange;
    const noOptionsText = props.context.attrs.noOptionsText !== undefined ? props.context.attrs.noOptionsText : 'Список пуст';
    const closeOnSelect = props.context.attrs.closeOnSelect !== undefined ? props.context.attrs.closeOnSelect : true;
    const resolveOnLoad = props.context.attrs.resolveOnLoad !== undefined ? props.context.attrs.resolveOnLoad : true;
    const object = props.context.attrs.resolveOnLoad !== undefined ? false : true;
    let setAfterAsync = props.context.attrs.setAfterAsync !== undefined ? props.context.attrs.setAfterAsync : false
    let vModelValue

    function handleSelect(value, select$) {
        props.context.node.input(value)
    }

    function multipleLabelFunc(value) {
        return value.length ? `Выбрано позиций: ${value.length}` : ''
    }

    function handleSearchChange(value, select$) {
    }
    
    onUpdated(() => {
        if (setAfterAsync) {
            let value = props.context.value
            if (value !== undefined) {
                multiselect._value.select(value)
                setAfterAsync = false
            }
        }
    })

</script>