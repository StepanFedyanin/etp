<template>
    <!-- <div class="app__main"> -->
    <!-- <Breadcrumbs /> -->
    <div class="cabinet invites">
        <div class="container">
            <div class="invites__content">
                <div class="h1">
                    Приглашения к участию в тендерах
                </div>
                <!-- {{ tenders }} -->
                <div class="tenders">
                    <template
                        v-if="showLoaderSending"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <!-- <pre>{{ tenders }}</pre> -->
                    <template
                        v-else-if="tenders && tenders.length"
                    >
                        <blockTender
                            v-for="(tender, index) in tenders"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :invites="true"
                            @getListInvitation="getListInvitation"
                        />
                    </template>
                    <template
                        v-else
                    >
                        У вас нет приглашений 
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
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
        data() {
            return {
                tenders: {},
                showLoaderSending: false,
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            this.getListInvitation();
        },
        methods: {
            getListInvitation() {
                this.showLoaderSending = true;
                api.getListInvitation().then(res => {
                    this.showLoaderSending = false;
                    this.tenders = res;
                    console.log(res);
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
            // getTenders() {
            //     let limit = Number(this.limit)
            //     let params = {
            //         limit,
            //         offset: this.offset
            //     }
            //     this.showLoaderSending = true;
            //     api.getTenders(params).then(tenders => {
            //         this.tenders = tenders
            //         this.showLoaderSending = false;
            //         console.log(tenders)
            //     }).catch(err => {
            //         this.showLoaderSending = false;
            //         console.error(err)
            //     })
            // },
        },
    };
</script>