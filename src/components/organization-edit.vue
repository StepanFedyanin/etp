<template>
    <div>
        <FormKit 
            id="organizationEdit"
            type="form" 
            :value="formData"
            form-class="$reset organization-edit__form form__edit"
            :actions="false"
            @submit="updateOrganization"
        >
            <!-- data-loading="showLoaderSending"
            :loading="showLoaderSending ? true : undefined" -->
            <FormKit
                type="text"
                label="ИНН"
                name="inn"
                placeholder="0002013922"
                disabled
                validation="required:trim"
                autocomplete="off"
            />
            <FormKit
                type="text"
                label=" КПП"
                name="kpp"
                placeholder="667701001"
                disabled
                validation="required:trim"
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="ОГРН"
                name="ogrn"
                placeholder="1116602000140"
                disabled
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Полное название организации"
                name="full_name"
                placeholder="ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ 'ЕКАТЕРИНБУРГСКИЙ ЦЕМЕНТНЫЙ ЗАВОД'"
                disabled
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="ФИО руководителя организации"
                name="head_name"
                placeholder="Шангареев Ринат Наилович"
                disabled
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Телефон (контактный)"
                name="head_post"
                placeholder="Директор"
                disabled
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="ФИО главного бухгалтера"
                name="accountant_name"
                placeholder="Иванова Любовь Ивановна"                
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Юридический адрес"
                name="legal_address"
                placeholder="Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784"
                disabled                
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Фактический адрес"
                name="actual_address"
                placeholder="Свердловская обл., г. Артемовский, ул. Дзержинского, Д. 1, К. Д, 623784"                
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="ОКПО"
                name="okpo"
                placeholder="91080111" 
                disabled               
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Сумма уставного капитала"
                name="capital"
                placeholder="1 510 000" 
                disabled               
                autocomplete="off"
            />
            <FormKit
                type="text"
                label="Основной вид деятельности (ОКВЭД)"
                name="principal_activity"
                placeholder="Производство сухих бетонных смесей" 
                disabled               
                autocomplete="off"
            />
            <!-- validation="matches:/^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/" -->
            <div class="double">
                <FormKit
                    type="button"
                    label="Отменить"
                    outer-class="form__button"
                    :input-class="{
                        'button': true,
                        'button-red': true
                    }"
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
                />
                <!-- data-loading="showLoaderSending"
                :disabled="showLoaderSending"
                :loading="showLoaderSending ? true : undefined" -->
                <!-- :disabled="loading || !isValid" -->
            </div>
        </FormKit>
    </div>
</template>
<script>
    import { user as api } from "@/services";
    export default {
        name: 'OrganizationEdit',
        props: {
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