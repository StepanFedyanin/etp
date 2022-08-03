<template>
    <div class="cabinet invite">
        <h1 class="h1">
            Пригласить партнеров
        </h1>
        <ul>
            <li>пригласите на площадку тех, с кем ваша компания уже торгует;</li>
            <li>сделайте ваш процесс закупок более прозрачным и удобным;</li>
            <li>укрепляйте связи с проверенными партнерами.</li>
        </ul>
        <Invite 
            @submitInviteHandler="submitInviteHandler"
        />
        <ModalSendInvite 
            :text="text || ''"
            :showModal="showSendInviteModal"
            @hideModal="hideSendInviteModal"
        />
    </div>
</template>
<script>
    import { user as api } from "@/services";
    import Invite from "@/components/forms/invite.vue";
    import ModalSendInvite from '@/components/modal-send-invite.vue'

    export default {
        components: {
            Invite,
            ModalSendInvite,
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
            }
        },
        methods: {
            submitInviteHandler(data) {
                let invites = {};
                for (let value in data) {
                    invites = data[value];
                }
                invites = invites.filter(item => item.email );
                
                console.log(invites);


                api.sendInvites({'invites': invites}).then(res => {
                    console.log(res.detail);
                    this.text = res.detail;
                    this.showMessage(this.text);
                    if (res.detail) {
                        this.showSendInviteModal = true
                    }
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                });
            },
            showMessage(text) {
                text
            },
            hideModal() {
                this.showSendInviteModal = false
            },
            
        }
    }


</script>