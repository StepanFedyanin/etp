<template>
    <div class="m--group">
        <Multiselect
            ref="multiselect"
            :options="props.context.options"
            :value="props.context._value?.country"
            mode="single"
            :object="true"
            :multipleLabel="multipleLabel"
            :searchable="true"
            :minChars="0"
            :canDeselect="false"
            :canClear="false"
            :class="context.classes.multiselect"
            :hideSelected="false"
            :close-on-select="true"
            :resolve-on-load="true"
            :noOptionsText="noOptionsText"
            :disabled="props.context.attrs.disabledCountry"
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
                            {{ option.value.name }}
                        </span>
                    </div>
                </div>
            </template>
        </Multiselect>
        <input
            ref="maska"
            v-maska
            :data-maska="props.context.maska?.mask"
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
    import { defineProps, ref, onUpdated, nextTick, computed } from 'vue';
    import Multiselect from '@vueform/multiselect';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    //const options = props.context.options;
    //console.log('Options', optionsList);
    console.log(props.context, 'props.context.maska', props.context.maska);
    const multiselect = ref(null);
    const maska = ref(null);
    const searchChange = props.context.attrs["search-change"];
    const multipleLabel = props.context.multipleLabel;
    const noOptionsText = props.context.attrs.noOptionsText !== undefined ? props.context.attrs.noOptionsText : 'Список пуст';
    const resolveOnLoad = props.context.attrs.resolveOnLoad !== undefined ? props.context.attrs.resolveOnLoad : true;
    const disabledCountry = props.context.attrs.disabledCountry !== undefined ? props.context.attrs.disabledCountry : false;
    const object = props.context.attrs.resolveOnLoad !== undefined ? true : false;

    const placeholder = props.context.placeholder || '';
    const disabled = props.context.disabled || false;
    const readonly = props.context.readonly || false;
    //const required = props.context.validatin === 'required' && 'required';

    function handleMaska($event) {
        //console.log('handleInput', $event.target.disabled)
        props.context.node.input({ country: multiselect.value._value || multiselect.value.value, number: $event.target.value })
    }
    /*
    function handleCreate(value, select$) {
        console.error('handleCreate');
        console.log(value, select$);
    }
    */
    function handleSelect(value, select$) {
        console.log(value);
        props.context.node.input({ country: value, number: maska.value._value })
    }

    onUpdated(() => {
        /*
        console.log('onUpdated', multiselect.value.pfo.length, multiselect.value.fo.length, multiselect.value.eo.length);
        console.log(props.context._value?.country);
        let v = props.context._value;
        //console.log(v);
        if (multiselect.value.pfo.length && v.country && !v.country.code_phone) {
            //console.log(multiselect.value.pfo);
            let option = multiselect.value.pfo.filter((item) => { return v.country.id === item.value.id })[0];
            if (option) multiselect.value.select(option);
        } else {
            //multiselect.value.clear();
        }
        */
    })
</script>