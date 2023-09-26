<template>
    <div class="m--group">
        <Multiselect
            ref="multiselect"
            :options="options"
            :value="props.context._value?.country"
            mode="single"
            :object="object"
            :multipleLabel="multipleLabel"
            :searchable="true"
            :minChars="0"
            :canDeselect="false"
            :canClear="false"
            :class="context.classes.multiselect"
            :hideSelected="false"
            :close-on-select="true"
            :resolve-on-load="resolveOnLoad"
            :noOptionsText="noOptionsText"
            noResultsText="Результатов не найдено"
            @change="handleSelect"
            @search-change="searchChange"
        >
            <template #option="{ option }">
                <div 
                    class="multiselect-country"
                >
                    <div class="multiselect-country__inner">
                        <span class="multiselect-country__code">
                            {{ option.label }}
                        </span>
                        <span class="multiselect-country__name">
                            {{ option.country }}
                        </span>
                    </div>
                </div>
            </template>
        </Multiselect>
        <input
            ref="maska"
            v-maska="props.context.maska"
            :value="props.context._value?.number"
            :disabled="disabled"
            :readonly="readonly"
            class="input"
            type="text"
            :placeholder="placeholder"
            @maska="handleMaska"
        >
    </div>
</template>

<script setup>
    import { defineProps, ref, onUpdated, computed } from 'vue';
    import Multiselect from '@vueform/multiselect';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    const options = props.context.options;
    //console.log('Options', options);
    const multiselect = ref(null);
    const maska = ref(null);
    const searchChange = props.context.attrs["search-change"];
    const multipleLabel = props.context.multipleLabel;
    const noOptionsText = props.context.attrs.noOptionsText !== undefined ? props.context.attrs.noOptionsText : 'Список пуст';
    const resolveOnLoad = props.context.attrs.resolveOnLoad !== undefined ? props.context.attrs.resolveOnLoad : true;
    const object = props.context.attrs.resolveOnLoad !== undefined ? true : false;

    const placeholder = props.context.placeholder || '';
    const disabled = props.context.disabled || false;
    const readonly = props.context.readonly || false;
    //const required = props.context.validatin === 'required' && 'required';

    function handleMaska($event) {
        //console.log('handleInput', $event.target.disabled)
        props.context.node.input({ country: multiselect.value._value || multiselect.value.value, number: $event.target.value })
    }

    function handleSelect(value, select$) {
        props.context.node.input({ country: value, number: maska.value._value })
    }

    onUpdated(() => {
        console.log('onUpdated');
        let v = props.context._value;
        if (v && v.fromParent) {
            multiselect.value.clear()
            multiselect.value.clearSearch()

            if (Array.isArray(v.value) && !v.value.length)
                return
            if (v.value) {
                multiselect.value.select(v.value)
            }
        }
    })
</script>