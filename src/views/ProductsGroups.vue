<template>
    <div :class="['groups']">
        <div :class="['container']">
            <app-breadcrumbs 
                v-if="!showLoaderSending.group"
                :breadcrumbs="[
                    { name: 'Главная', route: { name: 'home' } },
                    { name: 'Товары и услуги', route: { name: 'products' } },
                ]"
            />
            <template v-if="showLoaderSending">
                <div class="groups__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else-if="groups && groups.count">
                <h1 class="">&nbsp;</h1>
                <blockContent
                    classModifier="m--top"
                    place="top"
                    name="global"
                />
                <blockContent
                    classModifier="m--top"
                    place="top"
                    :name="$route.name"
                />
                <div class="groups__main">
                    <div class="groups__blocks">
                        <div
                            v-for="group in groups.results"
                            :key="group.id"
                            class="groups__block"
                        >
                            <div class="groups__block-title h2">
                                <router-link 
                                    :to="{ name: 'products-group', params: { slug: group.slug } }"
                                    class=""
                                >
                                    {{ group.name }}
                                </router-link>
                                <router-link 
                                    :to="{ name: 'products-group', params: { slug: group.slug } }"
                                    class="groups__block-title-more"
                                >
                                    <span>В категорию</span>
                                </router-link>
                            </div>
                            <blockGroups
                                :parent="group"
                                :groups="group.categories"
                                routeName="products"
                            />
                        </div>
                        <Pagination
                            v-if="groups.count > limit"
                            :total="groups.count"
                            :limit="limit"
                            :currentPage="Number($route.query.page || 1)"
                            :url="$route.path"
                        />
                    </div>
                </div>
            </template>
            <blockContent
                classModifier="m--bottom"
                place="bottom"
                name="global"
            />
            <blockContent
                classModifier="m--bottom"
                place="bottom"
                :name="$route.name"
            />
        </div>
    </div>
</template>

<script>
    import { category as categoryApi } from "@/services"
    import blockGroups from '@/components/block-groups.vue';
    import blockContent from '@/components/block-content.vue';
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'ProductsGroups',
        async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
            console.log('TendersGroups preFetch', process.env.SERVER, currentRoute.params);
            if (!process.env.SERVER) return;
            let limit = 20;
            let offset = (currentRoute.query?.page ? currentRoute.query?.page - 1 : 0) * limit;
            let params = {
                offset: offset,
                limit: limit,
            };

            await categoryApi.getCategoryProducts(params).then(res => {
                let groups = res;
                store.dispatch('setMeta', {});
                store.dispatch('fetchDataByKey', { data: groups, key: 'groups' });
            }).catch(err => {
                if (err.response?.status === 404) store.dispatch('showError', err.response.status);
            });
        },
        components: {
            blockGroups,
            blockContent,
            Pagination,
        },
        data() {
            return {
                //groups: {},
                //tenders: null,
                limit: 20,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            groups() {
                return this.$store.state.data?.groups || {};
            },
            page() {
                return Number(this.$route.query.page) || 1
            },
            offset() {
                return +this.limit * (this.page - 1);
            }
        },
        watch: {
            '$route.name': {
                immediate: true,
                handler(to) {
                    if (process.env.CLIENT && to === 'products-groups') this.getGroups();
                }
            },
            '$route.query.page': {
                //immediate: true,
                handler(to) {
                    if (to) this.getGroups();
                },
            }
        },
        mounted() {
        },
        methods: {
            getGroups() {
                let page = +this.$route.query.page || 1
                let params = {
                    limit: this.limit,
                    offset: (page - 1) * this.limit,
                }
                this.showLoaderSending = true;
                categoryApi.getCategoryListProducts(params).then(res => {
                    let groups = res
                    this.$store.dispatch('setMeta', {});
                    this.$store.dispatch('fetchDataByKey', { data: groups, key: 'groups' });
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        },
    }
</script>
