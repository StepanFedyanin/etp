<template>
    <div :class="['groups']">
        <div :class="['container']">
            <app-breadcrumbs 
                v-if="!showLoaderSending.group"
                :breadcrumbs="[
                    { name: 'Главная', route: { name: 'home' } },
                    { name: 'Тендеры', route: { name: 'tenders' } },
                ]"
            />
            <template v-if="showLoaderSending">
                <div class="groups__loader loader">
                    <div class="spinner" /> Загрузка данных
                </div>
            </template>
            <template v-else-if="groups && groups.count">
                <h1 class="">&nbsp;</h1>
                <div class="groups__main">
                    <div class="groups__blocks">
                        <div
                            v-for="group in groups.results"
                            :key="group.id"
                            class="group"
                        >
                            <router-link
                                :to="{ name: 'group', params: { slug: group.slug } }"
                                class="group__title h2"
                            >
                                {{ group.name }}
                            </router-link>
                            <div class="group__info">
                                <div class="group__info-trades">
                                    Тендеров: <span class="group__info-red">{{ group.bidding_count }}/{{ group.tender_count }}</span>
                                </div>
                            </div>
                            <ul class="group__products">
                                <li
                                    v-for="category in group.categories"
                                    :key="category.id"
                                    class="group__products-item"
                                >
                                    <router-link
                                        :to="{ name: 'group', params: { parentslug: group.slug, slug: category.slug } }"
                                    >
                                        {{ category.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <Pagination
                            :total="groups.count"
                            :limit="Number(limit)"
                            :currentPage="Number($route.query.page || 1)"
                            :url="$route.path"
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { category as categoryApi, tender as tenderApi } from "@/services"
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'TendersGroups',
        components: {
            Pagination,
        },
        data() {
            return {
                groups: {},
                tenders: null,
                limit: 10,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            '$route.query.page': {
                immediate: true,
                handler() {
                    this.getGroups();
                    this.getTenders();
                },
            }
        },
        mounted() {
        },
        methods: {
            getGroups() {
                let page = Number(this.$route.query.page) || 1
                let params = {
                    limit: this.limit,
                    offset: (page - 1) * this.limit,
                }
                this.showLoaderSending = true;
                categoryApi.getCategoryList(params).then(res => {
                    this.groups = res
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
            getTenders() {
                console.log('getTenders');
                let params = {
                    limit: 4,
                    offset: 0
                };
                //this.showLoaderSending = true;
                tenderApi.searchTenders(params).then(res => {
                    this.tenders = res.results;
                    //this.showLoaderSending = false;
                    console.log(res)
                }).catch(err => {
                    //this.showLoaderSending = false;
                    console.error(err)
                })
            }
        },
    }
</script>
