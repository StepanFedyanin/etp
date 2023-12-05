<template>
    <div :class="['groups']">
        <div :class="['container']">
            <app-breadcrumbs 
                v-if="!showLoaderSending.group"
                :breadcrumbs="[
                    { name: 'Главная', route: { name: 'home' } },
                    { name: 'Тендеры', route: { name: 'tenders' } },
                    { name: 'Категории', route: { name: 'tenders-groups' } },
                    { name: group.parent?.name, route: { name: 'tenders-group', params: { slug: group.parent?.slug || 0 } } },
                ]"
            />
            <template v-if="showLoaderSending['group']">
                <div class="groups__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else>
                <h1 class="groups__title h1">
                    {{ group.name }}
                </h1>
                <template v-if="showLoaderSending.tenders">
                    <div class="groups__main">
                        <div class="groups__loader loader">
                            <div class="spinner" /> Загрузка данных
                        </div>
                    </div>
                </template>
                <template v-else-if="group.categories?.length">
                    <div class="groups__main">
                        <div class="groups__block">
                            <blockGroups
                                :parent="group"
                                :groups="group.categories"
                            />
                        </div>
                    </div>
                </template>
            </template>
            <div class="tenders m--block">
                <template v-if="showLoaderSending['tenders'] && !tenders">
                    <div class="tenders__loader loader">
                        <div class="spinner" /> Загрузка тендеров
                    </div>
                </template>
                <template v-else-if="tenders && countTenders">
                    <div class="tenders__title h2">
                        Тендеры <span>({{ countTenders }})</span>
                    </div>    
                    <blockTender
                        v-for="(tender, index) in tenders"
                        :key="`tender-${index}`"
                        :tender="tender"
                    />
                    <template
                        v-if="showLoaderSending['tenders']"
                    >
                        <div class="tenders__loader loader">
                            <div class="spinner" /> Загрузка тендеров
                        </div>
                    </template>
                    <template
                        v-else
                    >
                        <button 
                            v-if="countTenders > tenders.length"
                            class="button button-outline-green tenders__more"
                            @click="getTenders()"
                        >
                            показать еще
                        </button>
                    </template>
                </template>
                <template v-else>
                    В данной категории нет открытых тендеров.
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as api } from "@/services"
    import blockGroups from '@/components/block-groups.vue';
    import blockTender from '@/components/block-tender.vue';
    //import Pagination from '@/components/pagination.vue'

    export default {
        name: 'TendersGroup',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('TendersGroups preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            if (!currentRoute.params.parentslug) {
                await api.getCategory(currentRoute.params.slug).then(res => {
                    let group = res;
                    store.dispatch('setMeta', group);
                    store.dispatch('fetchDataByKey', { data: group, key: 'group' });
                }).catch(err => {
                    if (err.response?.status === 404) store.dispatch('showError', err.response.status);
                });
            } else {
                await api.getSubCategory(currentRoute.params.parentslug, currentRoute.params.slug).then(res => {
                    let group = res
                    store.dispatch('setMeta', group);
                    store.dispatch('fetchDataByKey', { data: group, key: 'group' });
                }).catch(err => {
                    if (err.response?.status === 404) store.dispatch('showError', err.response.status);
                });
            }
        },
        components: {
            blockGroups,
            blockTender,
            //Pagination,
        },
        props: {
            parentslug: {
                type: String,
                default() { return null; }
            },
            slug: {
                type: String,
                default() { return null; }
            },
        },
        data() {
            return {
                //group: null,
                tenders: null,
                offsetTenders: 0,
                limitTenders: 5,
                countTenders: null,
                showLoaderSending: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            group() {
                return this.$store.state.data?.group || {};
            },
            page() {
                return Number(this.$route.query.page) || 1;
            },
            offset() {
                return (this.page - 1) * Number(this.limitGoods);
            }
        },
        watch: {
            slug: {
                //immediate: true,
                handler(to) {
                    if (to && !process.env.SERVER) this.getGroup();
                },
            },
            '$route.query.page': {
                handler() {
                    //this.getGoods()
                },
            }
        },
        mounted() {
            this.getGroup();
        },
        methods: {
            getGroup() {
                this.showLoaderSending['group'] = true;
                //this.goods = null;
                //this.countGoods = null;
                this.tenders = null;
                this.offsetTenders = 0;
                this.countTenders = null;
                if (!this.parentslug) {
                    api.getCategory(this.slug).then(res => {
                        let group = res;
                        this.$store.dispatch('setMeta', group);
                        this.$store.dispatch('fetchDataByKey', { data: group, key: 'group' });
                        this.getTenders();
                        this.showLoaderSending['group'] = false;
                    }).catch(err => {
                        this.showLoaderSending['group'] = false;
                        console.error(err)
                    })
                } else {
                    api.getSubCategory(this.parentslug, this.slug).then(res => {
                        let group = res
                        this.$store.dispatch('setMeta', group);
                        this.$store.dispatch('fetchDataByKey', { data: group, key: 'group' });
                        this.getTenders();
                        this.showLoaderSending['group'] = false;
                    }).catch(err => {
                        this.showLoaderSending['group'] = false;
                        console.error(err)
                    })
                }
            },
            getTenders() {
                this.showLoaderSending['tenders'] = true;
                console.log('getTenders');
                let limit = Number(this.limitTenders);
                let params = {
                    limit,
                    offset: this.offsetTenders
                };
                if (!this.parentslug) {
                    api.getCategoryTenders(this.slug, params).then(res => {
                        if (this.offsetTenders === 0) {
                            this.tenders = res.results;
                        } else {
                            this.tenders = [...this.tenders, ...res.results];
                        }
                        this.offsetTenders += this.limitTenders;
                        this.countTenders = res.count;
                        this.showLoaderSending['tenders'] = false;
                    }).catch(err => {
                        this.showLoaderSending['tenders'] = false;
                        console.error(err)
                    })
                } else {
                    api.getSubCategoryTenders(this.parentslug, this.slug).then(res => {
                        if (this.offsetTenders === 0) {
                            this.tenders = res.results;
                        } else {
                            this.tenders = [...this.tenders, ...res.results];
                        }
                        this.offsetTenders += this.limitTenders;
                        this.countTenders = res.count;
                        this.showLoaderSending['tenders'] = false;
                    }).catch(err => {
                        this.showLoaderSending['tenders'] = false;
                        console.error(err)
                    })
                }
            }
        },
    }
</script>
