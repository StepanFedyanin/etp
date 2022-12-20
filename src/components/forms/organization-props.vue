<template>
    <div>
        <FormKit 
            id="organizationEdit"
            v-model="formValues"
            name="organizationEdit"
            preserve
            type="form"
            data-loading="loading"
            form-class="$reset organization__form form__props"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="updateRequest"
        >
            <div class="form__block">
                <FormKitSchema 
                    :schema="schema" 
                />
            </div>
            <div class="form__content text">
                <p>Реквизиты организации заполняются автоматически при проверке на этапе регистрации.</p>
                <p>Если информация о вашей компании изменилась, нажмите на кнопку «Обновить реквизиты» — мы сделаем это автоматически.</p>
            </div>
            <div 
                class="form__submit m--start" 
                data-type="submit"
            >
                <button
                    type="submit"
                    :disabled="true"
                    class="button button-green"
                >
                    Обновить реквизиты
                </button>
            </div> 
        </FormKit>
    </div>
</template>
<script>
    import { user as api } from "@/services";
    export default {
        name: 'OrganizationEdit',
        props: {
            loading: {
                type: Boolean,
                default() { return false; }
            },
            readonly: {
                type: Boolean,
                default() { return false; }
            },
            user: {
                type: Object,
                default() { 
                    return {} 
                }
            },
            organization: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                formValues: this.organization,
                addressMatches: false,
                schema: [
                    {
                        $formkit: 'text',
                        name: 'inn',
                        label: 'ИНН',
                        placeholder: '0002013922',
                        disabled: true,
                        validation: 'required',
                        // outerClass: 'field--required'
                        // maska: { mask: ['##########', '############'] },
                    }, {
                        $formkit: this.organization.owner_type === 'ip' ? 'hidden' : 'text',
                        name: 'kpp',
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        disabled: true,
                        validation: [['matches', /^\d{9}$/]],
                        // outerClass: 'field--required',
                        // maska: { mask: '#########' },
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        label: 'ОГРН',
                        placeholder: '1116602000140',
                        disabled: true,
                        validation: 'required',
                        // outerClass: 'field--required',
                        // maska: { mask: '#############' },
                    },{
                        $formkit: 'text',
                        name: 'full_name',
                        label: 'Полное название организации',
                        placeholder: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЕКАТЕРИНБУРГСКИЙ ЦЕМЕНТНЫЙ ЗАВОД"',
                        // outerClass: 'field--required',
                        disabled: true,
                    },{
                        $formkit: 'text',
                        name: 'head_name',
                        label: 'ФИО руководителя организации',
                        placeholder: 'Шангареев Ринат Наилович',
                        disabled: true,
                        // outerClass: 'field--required',
                    },{
                        $formkit: 'text',
                        name: 'head_post',
                        label: 'Должность руководителя организации',
                        placeholder: 'Директор',
                        disabled: true,
                        // outerClass: 'field--required',
                    },{
                        $formkit: 'textarea',
                        name: 'legal_address',
                        label: 'Юридический адрес',
                        placeholder: 'Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784',
                        disabled: true,
                        // outerClass: 'field--required',
                    },{
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        placeholder: '91080111',
                        disabled: true,
                        validation: [['matches', /^(\d{8}|\d{10})$/]],
                        // outerClass: 'field--required',
                        // maska: { mask: ['########', '##########']},
                    },{
                        $formkit: this.organization.owner_type === 'ip' ? 'hidden' : 'text',
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        validation: 'required|number',
                        disabled: true,
                        // maska: { mask: '#*' },
                        // outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        label: 'Основной виде деятельности (ОКВЭД)',
                        disabled: true,
                        validation: 'required',
                        // outerClass: 'field--required'
                    // }, {
                    //     $formkit: 'checkbox',
                    //     name: 'owner_type',
                    //     label: 'Статус предприятия',
                    //     options: {
                    //         '1': 'Производитель',
                    //         '2': 'Дилер / дистрибьютор',
                    //         '3': 'Генподрядчик',
                    //         '4': 'Подрядчик'
                    //     },
                    //     outerClass: '
                    }
                ],
            };
        },
        mounted() {
        },
        methods: {
            updateRequest(formData, node) {
                console.log(formData);
                /*
                api.updateOrganization(formData.id,formData).then(res => {
                    // this.showLoaderSending = false;
                    this.$router.go(-1);
                }).catch(err => {
                    node.setErrors(
                        [err.detail],
                    );
                    // this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
                */
            },
        }
    };
</script>