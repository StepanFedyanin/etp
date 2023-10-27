<template>
    <div
        class="field"
        :class="className"
    >
        <div
            v-if="label && type !== 'boolean'"
            class="field__label"
        >
            <slot name="label">
                <label :for="idName">{{ label }}</label>
            </slot>
        </div>
        <div
            class="field__input"
        >
            <slot name="input">
                <template v-if="type === 'select'">
                    <select
                        :id="idName"
                        v-model.lazy="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        class="select"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    >
                        <option
                            v-if="optionull"
                            :value="optionull"
                        >
                            {{ placeholder }}
                        </option>
                        <option
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            :disabled="option.disabled"
                        >
                            {{ option.name }}
                        </option>
                    </select>
                </template>
                <template v-else-if="type === 'radio'">
                    <template
                        v-for="(option, idx) in options"
                    >
                        <input
                            :id="idNameIdx(idx)"
                            v-model.lazy="val"
                            :name="fieldName"
                            :value="option.value"
                            :disabled="disabled || option.disabled"
                            :readonly="readonly"
                            type="radio"
                            class="radiobox"
                            :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                        >
                        <label
                            :for="idNameIdx(idx)"
                        >{{ option.name }}</label>
                    </template>
                </template>
                <template v-else-if="type === 'checkbox'">
                    <template v-for="(option, idx) in options">
                        <input
                            :id="idNameIdx(idx)"
                            v-model.lazy="val"
                            :name="fieldName"
                            :value="option.value"
                            :disabled="disabled || option.disabled"
                            :readonly="readonly"
                            type="checkbox"
                            class="checkbox"
                            :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                        >
                        <label
                            :for="idNameIdx(idx)"
                        >
                            {{ option.name }}
                        </label>
                    </template>
                </template>
                <template v-else-if="type === 'boolean'">
                    <input
                        :id="idName"
                        v-model.lazy="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        type="checkbox"
                        class="checkbox"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    >
                    <label :for="idName">{{ label }}</label>
                </template>
                <template v-else-if="type === 'textarea'">
                    <textarea
                        :id="idName"
                        v-model.lazy="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        class="textarea"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    />
                </template>
                <template v-else-if="type === 'tel'">
                    <tel-input
                        :id="idName"
                        v-model="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        type="text"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    />
                </template>
                <template v-else-if="type === 'date'">
                    <date-input
                        :id="idName"
                        v-model="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        type="text"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    />
                </template>
                <template v-else-if="type === 'mask'">
                    <mask-input
                        :id="idName"
                        v-model="val"
                        :name="name"
                        :mask="mask"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        type="text"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    />
                </template>
                <template v-else-if="type === 'email'">
                    <input
                        :id="idName"
                        v-model.lazy="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        type="text"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    >
                </template>
                <template v-else-if="type === 'number'">
                    <number-input
                        :id="idName"
                        v-model="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        :precision="precision"
                        type="text"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    />
                </template>
                <template v-else>
                    <input
                        :id="idName"
                        v-model.lazy="val"
                        :name="name"
                        :disabled="disabled"
                        :readonly="readonly"
                        :placeholder="placeholder"
                        :type="type"
                        class="input"
                        :class="{ 'is-valid': valid, 'is-invalid': invalid, 'is-error': error }"
                    >
                </template>
            </slot>
        </div>
    </div>
</template>

<script>
    import telInput from './inputs/tel-input.vue';
    import dateInput from './inputs/date-input.vue';
    import numberInput from './inputs/number-input.vue';
    import maskInput from './inputs/mask-input.vue';

    export default {
        components: {
            telInput,
            dateInput,
            numberInput,
            maskInput
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: [String, Number, Boolean, Array, Object],
                required: true
            },
            label: {
                type: String,
                default: undefined
            },
            name: {
                type: String,
                default: undefined
            },
            id: {
                type: String,
                default: undefined
            },
            placeholder: {
                type: String,
                default: undefined
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            optionull: {
                type: String,
                default: ''
            },
            classval: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default() { return []; }
            },
            required: {
                type: Boolean,
                default: false
            },
            mask: {
                type: String,
                default: ''
            },
            precision: {
                type: Number,
                default: undefined
            },
            inline: {
                type: Boolean,
                default: false
            },
            valid: {
                type: [Boolean, String],
                default: false
            },
            invalid: {
                type: [Boolean, String],
                default: false
            },
            error: {
                type: [Boolean, String],
                default: false
            },
            control: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                val: this.value
            };
        },
        computed: {
            className() {
                let value = 'field--type_' + this.type;
                if (this.inline) {
                    value += ' field--inline';
                }
                if (this.required) {
                    value += ' field--required';
                }
                if (this.classval) {
                    value += ` ${this.classval}`
                }
                return value;
            },
            idName() {
                return this.id || this.name || 'field__' + this.random;
            },
            fieldName() {
                return this.name || 'field__' + this.random;
            },
            tooltip() {
                if (this.error && typeof this.error === 'string') {
                    return this.error;
                }
                if (this.invalid && typeof this.invalid === 'string') {
                    return this.invalid;
                }
                if (this.valid && typeof this.valid === 'string') {
                    return this.valid;
                }
                return '';
            },
            random() {
                return Math.floor(Math.random() * 32768);
            }
        },
        watch: {
            val(value) {
                this.change(value);
            },
            value(value) {
                this.val = value;
            }
        },
        methods: {
            idNameIdx(idx) {
                return this.idName + '--' + (idx + 1);
            },
            change(value) {
                this.$emit('change', value);
            },
            callControl() {
                this.$emit('action', this.val);
                this.$emit('control:' + 'action', this.val);
            }
        }
    };
</script>
