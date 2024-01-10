<template>
    <div class="form__block">
        <fieldset
            v-for="fieldset in struct.fieldsets"
            class="form__fieldset"
            :class="fieldset.className"
        >
            <div
                v-if="fieldset.header"
                class="form__header h3"
            >
                {{ fieldset.header }}
            </div>
            <template v-for="field in fieldset.fields">
                <slot
                    :name="field.name"
                >
                    <field
                        v-model="val[field.name]"
                        :value="val[field.name]"
                        :name="field.name"
                        :label="field.label"
                        :type="field.type"
                        :options="opt[field.name]"
                        :mask="field.mask"
                        :classval="field.class"
                        :precision="field.precision"
                        :optionull="field.optionull"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :valid="valid[field.name]"
                        :invalid="invalid[field.name]"
                        :error="errors[field.name]"
                        :inline="inline"
                        class="form__field"
                        @control:action="callControl(field.control, val[field.name])"
                    />
                </slot>
            </template>
        </fieldset>

        <fieldset
            v-if="struct.fields.length"
            class="form__fields"
        >
            <template v-for="field in struct.fields">
                <slot
                    :name="field.name"
                >
                    <field
                        v-model="val[field.name]"
                        :value="val[field.name]"
                        :name="field.name"
                        :label="field.label"
                        :type="field.type"
                        :mask="field.mask"
                        :precision="field.precision"
                        :optionull="field.optionull"
                        :placeholder="field.placeholder"
                        :classval="field.class"
                        :required="field.required"
                        :disabled="field.disabled"
                        :readonly="field.readonly"
                        :options="opt[field.name]"
                        :valid="valid[field.name]"
                        :invalid="invalid[field.name]"
                        :error="errors[field.name]"
                        :inline="inline"
                        class="form__field"
                        @action="callControl(field.control, val[field.name])"
                    />
                </slot>
            </template>
        </fieldset>

        <input
            v-for="field in struct.hiddens"
            :key="field.name"
            v-model="val[field.name]"
            :name="field.name"
            :disabled="field.disabled"
            type="hidden"
        >

        <div
            v-for="message in messages"
            :key="message"
            class="form__message"
        >
            {{ message }}
        </div>
    </div>
</template>

<script>
    import _find from 'lodash/find';
    import field from './field.vue';
    import validator from '@/utils/validator';

    export default {
        components: {
            field
        },
        props: {
            values: {
                type: Object,
                default() { return {}; }
            },
            errors: {
                type: Object,
                default() { return {}; }
            },
            messages: {
                type: Array,
                default() { return []; }
            }
        },
        data() {
            return {
                fields: [],
                fieldsets: [],
                options: {},
                checks: {},
                val: {},
                inline: true
            };
        },
        computed: {
            struct() {
                let fields = [],
                    fieldsets = [],
                    hiddens = [],
                    reserved = {};

                for (let fieldset of this.fieldsets) {
                    let items = [];
                    for (let fieldName of fieldset.names) {
                        if (reserved[fieldName]) {
                            console.warn(`Поле ${fieldName} уже было использовано`);
                        }
                        let field = this.fieldRel[fieldName];
                        if (field) {
                            if (field.type === 'hidden') {
                                hiddens.push(field);
                            } else {
                                items.push(field);
                            }
                            reserved[fieldName] = true;
                        } else {
                            console.warn(`Поле ${fieldName} не найдено`);
                        }
                    }
                    if (items.length) {
                        fieldset.fields = items;
                        fieldsets.push(fieldset);
                    }
                }

                for (let field of this.fields) {
                    if (!reserved[field.name]) {
                        if (field.type === 'hidden') {
                            hiddens.push(field);
                        } else {
                            fields.push(field);
                        }
                    }
                }

                return {
                    fieldsets,
                    fields,
                    hiddens
                };
            },
            fieldNames() {
                let names = [];
                for (let field of this.fields) {
                    if (!field.disabled) {
                        names.push(field.name);
                    }
                }
                return names;
            },
            fieldRel() {
                let rel = {};
                for (let field of this.fields) {
                    rel[field.name] = field;
                }
                console.log(rel);
                return rel;
            },
            opt() {
                let options = {};
                for (let field of this.fields) {
                    if (field.options !== undefined) {
                        options[field.name] = field.options;
                    } else if (field.name in this.options) {
                        options[field.name] = this.options[field.name];
                    }
                }
                return options;
            },
            chk() {
                let checks = {};
                for (let field of this.fields) {
                    if (field.checks !== undefined) {
                        for (let k in field.checks) {
                            checks[field.name] = checks[field.name] || {};
                            checks[field.name][k] = field.checks[k];
                        }
                    } else if (field.name in this.checks) {
                        checks[field.name] = this.checks[field.name];
                    }
                }
                return checks;
            },
            invalid() {
                let invalid = {};
                for (let fieldName of this.fieldNames) {
                    let value = this.val[fieldName],
                        error = null;

                    if (fieldName in this.chk) {
                        for (let check in this.chk[fieldName]) {
                            if (this.chk[fieldName][check]) {
                                error = validator[check](value, this.chk[fieldName][check]);
                                if (error) {
                                    break;
                                }
                            }
                        }
                    }

                    invalid[fieldName] = error;
                }

                return invalid;
            },
            valid() {
                let valid = {};
                for (let fieldName of this.fieldNames) {
                    let value = this.val[fieldName],
                        ok = null;

                    if (this.invalid[fieldName]) {
                        ok = false;
                    } else if (value !== '') {
                        ok = true;
                    }

                    valid[fieldName] = ok;
                }
                return valid;
            }
        },
        watch: {
            values: {
                handler() {
                    this.val = this.getDefaults(this.fields, this.values);
                },
                deep: true
            }
        },
        created() {
            for (let fieldName of this.fieldNames) {
                this.$watch('val.' + fieldName, () => { this.change(fieldName); });

                if (fieldName in this.opt) {
                    this.$watch('opt.' + fieldName, (value, old) => {
                        if (old !== undefined) {
                            if (this.val[fieldName] && !_find(this.opt[fieldName], { value: this.val[fieldName] })) {
                                this.val[fieldName] = '';
                            }
                        }
                    });
                }
            }
            console.log(this.fields, this.values);
            this.val = this.getDefaults(this.fields, this.values);
            console.log(this.val)
        },
        methods: {
            getDefaults(fields, values) {
                let data = {}
                console.log(this.fields, this.values);
                for (let field of fields) {
                    data[field.name] = this.getDefault(field, values[field.name]);
                }
                console.log(data);
                return data;
            },
            getDefault(field, value) {
                console.log(field, value);
                if (value === undefined) {
                    if (field.default !== undefined) {
                        value = field.default;
                    } else if (field.type === 'checkbox') {
                        value = [];
                    } else if (field.type === 'boolean') {
                        value = false;
                    } else if (field.type === 'struct') {
                        value = {};
                    } else {
                        value = '';
                    }
                }
                console.log(value);
                return value;
            },
            serialize() {
                let data = {};
                for (let fieldName of this.fieldNames) {
                    if (!/^__/.test(fieldName)) {
                        data[fieldName] = this.val[fieldName];
                    }
                }
                return data;
            },
            validate() {
                for (let fieldName of this.fieldNames) {
                    if (this.invalid[fieldName]) {
                        return false;
                    }
                }
                return true;
            },
            change(fieldName) {
                let data = this.serialize();

                if (fieldName) {
                    this.$emit('change:' + fieldName, data[fieldName]);
                }
                this.$emit('change', data);
            },
            callControl(control, val) {
                this.$emit(control.event, val);
                this.$emit('control:' + control.event, val);
            }
        }
    };
</script>
