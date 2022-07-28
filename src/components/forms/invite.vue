<template>
    <div class="invite__container">
        <FormKit v-model="groupValues" type="group">
            <FormKit :type="simpleText" name="name" />
            <!-- <FormKit :type="simpleText" name="email" /> -->
        </FormKit>
        <pre wrap>{{ groupValues }}</pre>

        <FormKit 
            v-model="formValues"
            name="invite"
            preserve
            type="form"
            data-loading="showLoaderSending"
            :value="item"
            form-class="$reset invite__form form__edit"
            :actions="false"
            :disabled="showLoaderSending"
            :loading="showLoaderSending ? true : undefined"
            @submit="submitHandler"
        >
            <div
                v-for="(item, index) in invites"
                :key="index"
            >   
                <div class="invite__item">
                    {{ index }}. {{ item }}
                    <!-- <FormKit :type="simpleText" name="name" /> -->
                    <FormKitSchema 
                        :schema="schema" 
                    />
                </div>
            </div> 
            <pre wrap>{{ message }}</pre> 
            <button 
                class="button button-outline-green"
                @click="addInvite"
            >
                + Добавить приглашение
            </button>
            <button 
                class="button button-outline-green"
                :loading="showLoaderSending"
                @click="submitHandler"
            >
                Отправить приглашения
            </button>
        <!-- <button 
            type="submit"
            form="invite"
            class="button button-outline-green"
            :loading="showLoaderSending"
            @submit="submitHandler"
        >
            Отправить приглашения
        </button> -->
        </FormKit>
        <!-- <FormKit 
            id="invite"
            v-model="formValues"
            name="invite"
            preserve
            type="form"
            data-loading="showLoaderSending"
            :value="formData"
            form-class="$reset invite__form form__edit"
            :actions="false"
            :disabled="showLoaderSending"
            :loading="showLoaderSending ? true : undefined"
            @submit="submitHandler"
        >
            <div 
                v-for="(item, index) in invites"
                :key="index"
                class="invite__item"
            >
                {{ index }}. {{ item }}
                <div class="h3">Приглашение</div>
                <div class="form__block">
                    <FormKitSchema 
                        :schema="schema" 
                    />
                </div>
            </div>



            <button 
                class="button button-outline-green"
                @click="addInvitate"
            >
                + Добавить приглашение
            </button>
            <button 
                class="button button-outline-green"
                :loading="showLoaderSending"
                @submitInviteHandler="submitHandler"
            >
                Отправить приглашения
            </button>
        </FormKit> -->
    </div>
</template>
<script>
// import { slice } from 'lodash';

// import { da } from '@formkit/i18n';

    // import { ref } from 'vue'
    export default {
        
        name: 'Invite',
        data() {
            return {
                // groupValues: ref({}),
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
                // showLoaderSending: false,
                // inviteNumbers: 1,
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
            deleteInvite() {
                let myIndex = this.invites.indexOf('two');
                this.invites.splice(myIndex,1)
            },
            submitHandler(data) {
                // console.log(data, this.invites, this.formValues)
                this.$emit('submitInviteHandler', data)
                // this.$emit('submitInviteHandler', {invites: [{
                //     name: data.name,
                //     email: data.email
                // }]
                // });
            },
        }

    }
</script>