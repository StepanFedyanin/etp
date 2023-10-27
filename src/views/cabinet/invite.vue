<template>
    <div class="app__main">
        <div class="cabinet invite">
            <div class="container">
                <app-breadcrumbs 
                    :breadcrumbs="[
                        { name: 'Главная', route: { name: 'home' } },
                        { name: 'Кабинет', route: { name: 'cabinet' } },
                    ]"
                />
                <h1 class="h1">
                    Пригласить партнеров
                </h1>
                <ul class="invite__benefits">
                    <li>пригласите на площадку тех, с кем ваша компания уже торгует;</li>
                    <li>сделайте ваш процесс закупок более прозрачным и удобным;</li>
                    <li>укрепляйте связи с проверенными партнерами.</li>
                </ul>
                <Invite 
                    @submitInviteHandler="submitInviteHandler"
                />
                <ModalInviteSend 
                    :text="text || ''"
                    :emails="emails || ''"
                    :showModal="showSendInviteModal"
                    @hideModal="hideSendInviteModal"
                />
            </div>
        </div>
    </div>
</template>
<script>
    import { user as api } from "@/services";
    import Invite from "@/components/forms/invite.vue";
    import ModalInviteSend from '@/components/modals/invite-send.vue'

    export default {
        components: {
            Invite,
            ModalInviteSend,
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                // showLoaderSending: false,
                showSendInviteModal: false, 
                text: '',
                emails: '',
            }
        },
        methods: {
            submitInviteHandler(data) {
                let invites = [];
                for (let value in data) {
                    invites = data[value];
                }
                invites = invites.filter(item => item.email );

                api.sendInvites({'invites': invites}).then(res => {
                    console.log(res);
                    this.text = res.detail;
                    for(let i=0; i < res.emails.length ; i++){
                        if(i === 0){
                            this.emails += res.emails[i];
                        } else{
                            this.emails += (", " + res.emails[i]);
                        }
                    }
                    if (res.detail) {
                        this.showSendInviteModal = true
                    }
                }).catch(err => {
                    this.text = err.detail;
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            hideSendInviteModal(){
                this.showSendInviteModal = false;
                this.emails = "";
                this.text = "";
            }
            
        }
    }


</script>