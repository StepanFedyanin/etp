<template>
    <FormKit
        v-model="formValues"
        name="form-search"
        preserve
        type="form"
        data-loading="loading"
        form-class="$reset registration__form form"
        submit-label="Далее"
        :disabled="loading"
        :loading="loading ? true : undefined"
        :submit-attrs="{
            inputClass: '$reset button button-green',
            wrapperClass: '$reset form__submit',
            outerClass: '$reset',
        }"
        @submit="submitHandler"
    >
        <div class="form__block">
            <FormKitSchema 
                :schema="schema" 
            />
        </div>
    </FormKit>
</template>
<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
            formData: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'maska',
                        name: 'inn',
                        label: 'ИНН',
                        placeholder: 'Ваш ИНН',
                        validation: [['required'], ['matches', /^(\d{10}|\d{12})$/]],
                        maska: { mask: ['##########', '############'] },
                        outerClass: 'field--inline field--required'
                    }, {
                        $formkit: 'maska',
                        name: 'kpp',
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        validation: [['matches', /^\d{9}$/]],
                        maska: { mask: '#########' },
                        outerClass: 'field--inline'
                    }, {
                        $formkit: 'checkbox',
                        name: 'owner_type',
                        label: 'Статус предприятия',
                        options: {
                            '1': 'Производитель',
                            '2': 'Дилер / дистрибьютор',
                            '3': 'Генподрядчик',
                            '4': 'Подрядчик'
                        },
                        outerClass: 'field--inline'
                    }
                ],
            }
        },
        methods: {
            submitHandler(data, node) {
                this.$emit('submitSearchHandler', this.formValues, node);
            },
        }
    };
</script>
