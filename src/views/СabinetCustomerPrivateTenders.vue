<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet news">
            <div class="container">
                <div class="news__content text">
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
                        <!-- <pre>{{ tenders.length}}</pre> -->
                        <template
                            v-if="tenders && tenders.length > 0"
                        >
                            <blockTender
                                v-for="(tender, index) in tenders"
                                :key="`tender-${index}`"
                                :tender="tender"
                                :invites="true"
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
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs.vue';

    export default {
        components: {
            // Breadcrumbs
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
        }
    };
</script>