<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet news">
            <div class="container">
                <div class="news__content text">
                    Приглашения к участию в тендерах

                    <div class="tenders">
                        <template
                            v-if="showLoaderSending"
                        >
                            <div class="tenders__loader loader">
                                <div class="spinner" /> Загрузка данных
                            </div>
                        </template>
                        <template
                            v-else-if="tenders && tenders.count"
                        >
                            <blockTender
                                v-for="(tender, index) in tenders.results"
                                :key="`tender-${index}`"
                                :tender="tender"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs.vue';
    import { tender as api} from "@/services"
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            // Breadcrumbs
            blockTender
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            this.cancelInvitation();
        },
        methods: {
            cancelInvitation(invitesId){
                api.cancelInvitation(this.tenderId, invitesId).then(res => {
                    console.log(res);
                    this.invites = res;
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            getTenders() {
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                this.showLoaderSending = true;
                api.getTenders(params).then(tenders => {
                    this.tenders = tenders
                    this.showLoaderSending = false;
                    console.log(tenders)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        },
    };
</script>