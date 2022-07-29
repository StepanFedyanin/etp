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
            <h2>Пригласить партнеров</h2>

            <FormKit type="list">
                <div
                    v-for="(item, index) in invites"
                    :key="index"
                >   
                    {{ index }} 
                    <FormKit type="group">
                        <FormKit
                            name="name"
                            label="ФИО"
                            placeholder="Петров Петр"
                            validation="required"
                        />
                        <FormKit
                            name="email"
                            label="Email"
                            placeholder="petrov@mail.ru"
                            validation="required|email"
                        />
                    </FormKit>
                    <svg 
                        v-if="item" 
                        class="svg-icon svg-icon__stop"
                        @click="deleteInviteForm(index)"
                    >
                        <use xlink:href="../../assets/img/icons/icons.svg#stop" />
                    </svg>
                </div>
                <div 
                    class="button button-outline-green"
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
                groupValues: {},
                simpleText: {
                    type: 'input',
                    schema: [
                        {
                            $el: 'input',
                            name: 'name',
                            attrs: {
                                onInput: '$handlers.DOMInput',
                                value: '$_value',
                                
                            },
                        },
                    ],
                },
                formData: undefined,
                formValues: this.formData,
                schema: [
                    {
                        $formkit: 'text',
                        name: 'name',
                        label: 'ФИО',
                        placeholder: "Петров Петр",
                        outerClass: 'field--required'
                    }, {
                        $formkit: 'email',
                        name: 'email',
                        label: 'EMAIL',
                        placeholder: 'petrov@mail.ru',
                        outerClass: 'field--required',
                    }
                ],
                list:[],
                invites: [{
                    name: '',
                    email: ''
                }]
            }
        },
        methods: {
            addInvite() {
                this.invites.push({name: '', email: ''});
            },
            deleteInviteForm(index) {
                console.log(index);
                this.invites.splice(index,1)
            },
            submitHandler(data) {
                console.log(data);
                console.log(this.invites);
                this.$emit('submitInviteHandler', data)

            },
        }

    }
</script>