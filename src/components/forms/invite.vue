<template>
    <div class="invite__container">
        <FormKit 
            v-model="list"
            type="form" 
            form-class="$reset invite__form form__edit"
            :actions="false"
            :disabled="false"
            @submit="submitHandler"
        >
            <FormKit type="list">
                <div 
                    v-for="(index) in invitesCount"
                    :key="index"
                    class="list__item"
                >   
                    <div class="item__title">
                        Приглашение №{{ index }} 
                        <div 
                            v-if="index && invitesCount > 1" 
                            class="svg-icon svg-icon__crossCircle"
                            @click="deleteInviteForm(index - 1, list)"
                        />
                    </div> 
                    <FormKit type="group">
                        <FormKit
                            type="hidden"
                            name="index"
                        />
                        <FormKit
                            name="name"
                            label="ФИО"
                            placeholder="Петров Петр"
                            validation="required"
                            outerClass="field--required"
                        />
                        <FormKit
                            name="email"
                            label="Email"
                            placeholder="petrov@mail.ru"
                            validation="required|email"
                            outerClass="field--required"
                        />
                    </FormKit>
                </div>
                <div 
                    class="button button-transparent"
                    @click="addInvite"
                >
                    + Добавить приглашение
                </div>
                <button 
                    class="button button-outline-green"
                    @submit="submitHandler"
                >
                    Отправить приглашения
                </button>
            </FormKit>
        </FormKit>
    </div>
</template>
<script>
    export default {  
        name: 'Invite',
        data() {
            return {
                formData: undefined,
                formValues: this.formData,
                list:[],
                invitesCount: 1
            }
        },
        methods: {
            addInvite() {
                this.invitesCount++
            },
            deleteInviteForm(index, list) {
                let arrInvites = [];
                for (let value in list) {
                    arrInvites = [...list[value]];
                }
                arrInvites.splice(index, 1);
                this.invitesCount--;
                for (let value in list) {
                    this.list[value] = [...arrInvites];
                }
            },
            submitHandler(data) {
                this.$emit('submitInviteHandler', data)
            },
        }

    }
</script>