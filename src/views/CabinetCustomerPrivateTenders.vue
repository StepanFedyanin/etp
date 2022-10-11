<template>
    <div class="cabinet private-tenders">
        <div class="container">
            <div class="private-tenders__content">
                <div class="h1">
                    Закрытые тендеры
                </div>
                <div class="tenders">
                    <template
                        v-if="showLoaderSending"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <!-- <pre>{{ tenders.results}}</pre> -->
                    <template
                        v-if="tenders && tenders.count > 0"
                    >
                        <blockTender
                            v-for="(tender, index) in tenders.results"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :private="true"
                        />
                    </template>
                    <template
                        v-else
                    >
                        Вы не участвуете в закрытых тендерах.
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as tenderApi } from "@/services"
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
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
            this.getListPrivateTenders();
        },
        methods: {
            getListPrivateTenders(){
                let tendersType = {type: "reduction_closed"};
                tenderApi.getTendersPrivates(tendersType).then(tenders => {
                    // if (tenders.type==="reduction_closed") {
                    //     this.tenders = tenders;
                    // }
                    this.tenders = tenders;
                    this.showLoaderSending = false;
                    console.log(tenders);
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                })
            },
        }
    };
</script>