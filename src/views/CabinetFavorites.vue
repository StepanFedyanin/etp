<template>
    <!-- <div class="app__main"> -->
    <!-- <Breadcrumbs /> -->
    <div class="cabinet favorites-tenders">
        <div class="container">
            <div class="favorites-tenders__content">
                <div class="h1">
                    Избранные тендеры
                </div>
                <div class="tenders">
                    <template
                        v-if="showLoaderSending"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </template>
                    <!-- <pre>{{ tenders }}</pre>
                    <pre>{{ emptyFavoritesTenters }}</pre> -->
                    <template
                        v-if="tenders && !emptyFavoritesTenters"
                    >
                        <blockTender
                            v-for="(tender, index) in tenders"
                            :key="`tender-${index}`"
                            :tender="tender"
                            :favorites="true"
                        />
                    </template>
                    <template
                        v-else
                    >
                        У вас нет избранных тендеров.
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs.vue';
    import { tender as tenderApi } from "@/services"
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
        computed: {
            emptyFavoritesTenters() {
                return Object.keys(this.tenders).length === 0
            },
            // emptyFavoritesTenters: Object.keys(this.tenders).length === 0
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            this.getFavoritesTenders();
        },
        methods: {
            getFavoritesTenders(){
                tenderApi.getFavoritesTenders().then(tenders => {
                    this.tenders = tenders;
                    this.showLoaderSending = false;
                    // console.log(tenders);
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err);
                })
            },
        }
    };
</script>