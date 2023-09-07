<template>
    <div class="cabinet tenders">
        <div class="container">
            <div
                class="app__breadcrumbs"
            >
                <router-link
                    :to="{ name: 'home' }"
                    class="app__breadcrumbs-link"
                >
                    Главная
                </router-link>
            </div>
            <div class="h1">&nbsp;</div>
            <div class="tenders__search">
                <!--div class="tenders__search-form">
                    <Search
                        @startSearch="startSearch"
                    />
                </div-->
                <div
                    v-if="tenders && tenders.count"
                    class="tenders__pagination"
                >
                    <Pagination
                        :total="tenders.count"
                        :limit="Number(limit)"
                        :currentPage="Number($route.query.page || 1)"
                        :url="$route.path"
                    />
                </div>
            </div>
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
            <template
                v-else
            >
                <div class="tenders__empty">
                    В данный момент у вас нет ни одного тендера
                </div> 
            </template>
            <div
                v-if="!showLoaderSending && tenders && tenders.count"
                class="tenders__pagination"
            >
                <Pagination
                    :total="tenders.count"
                    :limit="Number(limit)"
                    :currentPage="Number($route.query.page || 1)"
                    :url="$route.path"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { tender as api } from "@/services";
    //import Search from '@/components/app-search.vue';
    import Pagination from '@/components/pagination.vue';
    import blockTender from '@/components/block-tender.vue';

    export default {
        components: {
            //Search,
            Pagination,
            blockTender
        },
        props: {
            status: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                limit: 10,
                tenders: null,
                showLoaderSending: false
            }
        },
        computed: {
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                let limit = Number(this.limit)
                return (this.page - 1) * limit
            }
        },
        watch: {
            limit () {
                if (this.$route.query.page) {
                    this.$router.replace({ query: {} })
                } else {
                    this.getTenders()
                }
            },
            'status': {
                handler() {
                    this.getTenders()
                },
            },
            '$route.query.page': {
                handler() {
                    this.getTenders()
                },
            }
        },
        mounted() {
            console.log(this.status);
            this.getTenders()
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            getTenders() {
                let limit = Number(this.limit)
                let params = {
                    limit,
                    offset: this.offset
                }
                if (this.status === 'currents') {
                    this.showLoaderSending = true;
                    api.getCurrentsTenders(params).then(tenders => {
                        this.tenders = tenders
                        this.showLoaderSending = false;
                        console.log(tenders)
                    }).catch(err => {
                        console.error(err)
                    })
                } else if (this.status === 'closed') {
                    this.showLoaderSending = true;
                    api.getClosedTenders(params).then(tenders => {
                        this.tenders = tenders
                        this.showLoaderSending = false;
                        console.log(tenders)
                    }).catch(err => {
                        console.error(err)
                    })
                }
            },
            startSearch(formData) {
                formData.limit = Number(this.limit)
                formData.offset = this.offset
                console.log(formData)
                this.showLoaderSending = true;
                api.searchTenders(formData).then(tenders => {
                    this.showLoaderSending = false;
                    this.tenders = tenders
                    console.log(tenders)
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            }
        }
    };
</script>
