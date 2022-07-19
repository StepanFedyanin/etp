<template>
    <div>
        <FormKit 
            id="organizationEdit"
            v-model="formValues"
            name="organizationEdit"
            preserve
            type="form"
            data-loading="loading"
            :value="formData"
            form-class="$reset organization-edit__form form__edit"
            :actions="false"
            :disabled="loading"
            :loading="loading ? true : undefined"
            @submit="updateOrganization"
        >
            <div class="form__block">
                <FormKitSchema 
                    :schema="schema" 
                />
            </div>
            <!-- validation="matches:/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
            <!-- <div class="double">
                <FormKit
                    type="button"
                    label="Отменить"
                    outer-class="form__button"
                    :input-class="{
                        'button': true,
                        'button-red': true
                    }"
                    :disabled="loading"
                    @click="onClickCancel"
                />
                <FormKit
                    type="submit"
                    label="Сохранить"
                    outer-class="form__button"
                    :input-class="{
                        'button': true,
                        'button-green': true
                    }"
                    :disabled="loading"
                /> -->
            <!-- data-loading="showLoaderSending"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined" -->
            <!-- :disabled="loading || !isValid" -->
            <!-- </div> -->
            <div 
                class="form__submit edit__form-submit" 
                data-type="submit"
            >
                <button
                    :disabled="loading"
                    class="button button-red"
                    @click="onClickCancel"
                >
                    Отменить
                </button>
                <button
                    type="submit"
                    :disabled="loading"
                    class="button button-green"
                >
                    Сохранить
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
            // formData: {
            //     type: Object,
            //     default() { return {}; }
            // },
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
                formData: undefined,
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'text',
                        name: 'inn',
                        label: 'ИНН',
                        placeholder: "0002013922",
                        disabled: true,
                        validation: 'required|matches:/^(d{10}|d{12})$/',
                        // maska: { mask: ['##########', '############'] },
                    }, {
                        $formkit: 'text',
                        name: 'kpp',
                        label: 'КПП',
                        placeholder: 'Ваш КПП',
                        disabled: true,
                        validation: [['matches', /^\d{9}$/]],
                        // maska: { mask: '#########' },
                    }, {
                        $formkit: 'text',
                        name: 'ogrn',
                        label: 'ОГРН',
                        placeholder: '1116602000140',
                        disabled: true,
                        validation: [['matches', /^\d{13}$/]],
                        // maska: { mask: '#############' },
                    },{
                        $formkit: 'text',
                        name: 'full_name',
                        label: 'Полное название организации',
                        placeholder: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЕКАТЕРИНБУРГСКИЙ ЦЕМЕНТНЫЙ ЗАВОД"',
                        disabled: true,
                    },{
                        $formkit: 'text',
                        name: 'head_name',
                        label: 'ФИО руководителя организации',
                        placeholder: 'Шангареев Ринат Наилович',
                        disabled: true,
                    },{
                        $formkit: 'text',
                        name: 'head_post',
                        label: 'Должность руководителя организации',
                        placeholder: 'Директор',
                        disabled: true,
                    },{
                        $formkit: 'text',
                        name: 'accountant_name',
                        label: 'ФИО главного бухгалтера',
                        placeholder: 'Иванова Любовь Ивановна',
                        disabled: false,
                    },{
                        $formkit: 'text',
                        name: 'legal_address',
                        label: 'Юридический адрес',
                        placeholder: 'Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784',
                        disabled: true,
                    },{
                        $formkit: 'text',
                        name: 'actual_address',
                        label: 'Фактический адрес',
                        placeholder: 'Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784',
                        disabled: false,
                    },{
                        $formkit: 'text',
                        name: 'okpo',
                        label: 'ОКПО',
                        placeholder: '91080111',
                        disabled: true,
                        validation: [['matches', /^(\d{8}|\d{10})$/]],
                        // maska: { mask: ['########', '##########']},
                    },{
                        $formkit: 'text',
                        name: 'capital',
                        label: 'Сумма уставного капитала',
                        validation: 'required|number',
                        disabled: true,
                        // maska: { mask: '#*' },
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'text',
                        name: 'principal_activity',
                        label: 'Основной виде деятельности (ОКВЭД)',
                        disabled: true,
                        validation: 'required',
                        outerClass: 'field--required'
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
        created() {
            this.formData = this.organization
        },
        methods: {
            onClickCancel() {
                this.$router.go(-1);
            },
            updateOrganization(formData, node) {
                console.log(formData);
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
                    // this.$store.dispatch('showError', err);
                    // console.error(err);
                });
                // alert(`Submitted ${formData.last_name} successfully!`)
            },
        }
    };
</script>