<template>
    <Multiselect
        ref="multiselect"
        :options="options"
        :value="props.context._value"
        :mode="mode"
        :object="object"
        :multipleLabel="multipleLabel"
        :searchable="searchable"
        :minChars="minChars"
        :groups="groups"
        :groupSelect="groupSelect"
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

    const options = props.context.options;
    // console.log('Options', props.context)
    const multiselect = ref(null)
    const mode = props.context.mode || 'single';
    const searchable = props.context.searchable || false;
    const minChars = props.context.attrs.minChars;
    const searchChange = props.context.attrs["search-change"] || handleSearchChange;
    const groups = props.context.attrs.groups || false;
    const groupSelect = props.context.attrs.groupSelect || false;
    const multipleLabel = props.context.multipleLabel || multipleLabelFunc;
    const noOptionsText = props.context.attrs.noOptionsText !== undefined ? props.context.attrs.noOptionsText : 'Список пуст';
    const closeOnSelect = props.context.attrs.closeOnSelect !== undefined ? props.context.attrs.closeOnSelect : true;
    const resolveOnLoad = props.context.attrs.resolveOnLoad !== undefined ? props.context.attrs.resolveOnLoad : true;
    const object = props.context.attrs.resolveOnLoad !== undefined ? true : false;
    // let vModelValue = reactive({})

    function handleSelect(value, select$) {
        // console.log('handleSelect')
        props.context.node.input(value)
    }

    function multipleLabelFunc(value) {
        return value.length ? `Выбрано позиций: ${value.length}` : ''
    }

    function handleSearchChange(value, select$) {
    }

    onUpdated(() => {
        let v = props.context._value
        if (v && v.fromParent) {
            multiselect._value.clear()

            if (searchable)
                multiselect._value.clearSearch()

            if (Array.isArray(v.value) && !v.value.length)
                return

            if (v.value)
                multiselect._value.select(v.value)
        }
    })
</script>