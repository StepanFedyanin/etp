<template>
    <DatePicker
        v-model="value"
        :mode="mode"
        :timezone="timezone"
        is24hr
        @update:modelValue="handleInput"
    >
        <template #default="{ inputValue, inputEvents }">
            <input
                ref="pickerInput"
                :value="inputValue"
                v-on="inputEvents"
            >
        </template>
    </DatePicker>
</template>

<script setup>
    import { defineProps, ref, onUpdated } from 'vue';
    import { DatePicker } from 'v-calendar';
    import 'v-calendar/dist/style.css';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    const pickerInput = ref(null);
    const mode = props.context.mode || 'date';
    const timezone = props.context.timezone || 'utc';
    let value = props.context._value;

    function handleInput(value) {
        //value = value.toLocalDateString('ru');
        console.log('handleInput', value, mode)
        props.context.node.input(value);
    }

    onUpdated(() => {
        //let v = props.context._value
        //updateValue(v, {});
        value = props.context._value;
        pickerInput.value._value.select(value);
        console.log('onUpdated DatePicker', pickerInput.value._value.select(value));
    })
</script>