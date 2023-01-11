<template>
    <div
        :class="blockClass" 
        class="goods"
    >
        <div class="goods__title">
            Загруженные товары <span>(105)</span>
        </div>
        <div class="goods__block">
            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ, УАЗ, ЗИЛ, Газель, удлинненное до немыслимых размеров</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>

            <div class="goods__item">
                <div class="goods__item-photo m--no-photo">
                    <div class="goods__item-photo-inner">
                        
                    </div>
                </div>
                <div class="goods__item-info">
                    <div class="goods__item-price">123 006 000 ₽</div>
                    <div class="goods__item-desc">Длинное название запчасти на автомобиль КамАЗ</div>
                </div>
                <div class="goods__item-control">
                    <a href="#" class="goods__item-control-link m--change">Изменить</a>
                    <a href="#" class="goods__item-control-link m--delete">Удалить</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    import { tender as tenderApi } from "@/services"

    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    id: 1
                }; }
            },
            drafts: {
                type: Boolean,
                default() { return false; }
            },
            invites: {
                type: Boolean,
                default() { return false; }
            },
        },
        emits: ['getListInvitation'],
        data() {
            return {
                urlPath,
                isShowPositions: false,
                favorite: this.tender.favorite,
                // inviteStatus: '',
            };
        },
        computed: {
            documents() {
                if (this.tender.documents.length)
                    return this.tender.documents.filter(file => file.publication)
                
                return false
            },
            lots() {
                if (this.tender.lots.length)
                    return this.tender.lots //.filter(lot => lot.publication)
                
                return false
            },
            restTime() {
                let rest = new Date(this.tender.date_end) - new Date()
                if (this.tender.status === 'bid_accept' || this.tender.status === 'bidding_process') {
                    return (rest < 0) ? false : true;
                } else {
                    return false;
                }
            }
        },
        created() {
            // this.getInviteStatus();
        },
        methods: {
            onClickDraft() {
                this.$router.push({ name: 'tender-edit', params: { id: this.tender.id } });
            },
            onClickParticipate() {
                this.$router.push({ name: 'tender', params: { id: this.tender.id } });
            },
            toggleFavorite() {
                this.favorite = !this.favorite;
                tenderApi.switchFavoriteTender(this.tender.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickAcceptInvite(){
                tenderApi.acceptInvitation(this.tender.id).then(res => {
                    console.log(res);
                    this.inviteStatus = 'accepted';
                    this.$emit('getListInvitation');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            onClickRejectInvite(){
                tenderApi.rejectInvitation(this.tender.id).then(res => {
                    console.log(res);
                    this.inviteStatus = 'reject';
                    this.$emit('getListInvitation');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            // getInviteStatus() {
            //     console.log(this.tender);
            //     if(this.tender.user_invite.status === 'sent') {
            //         this.inviteStatus ='sent';
            //     } else if (this.tender.user_invite.status === 'accepted') {
            //         this.inviteStatus ='accepted';
            //     } else {
            //         this.inviteStatus ='';
            //     }
            // }
        },
    };
</script>
