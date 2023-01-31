<template>
    <div class="app__main">
        <div class="groups">
            <div class="container">
                <div class="app__breadcrumbs">
                    <router-link
                        :to="{ name: 'home' }"
                        class="app__breadcrumbs-link"
                        v-text="`Главная`"
                    />
                </div>
            </div>
            <div class="container">
                <h1 
                    class="groups__title h1"
                >
                    Товарные группы
                </h1>
                <template
                    v-if="showLoaderSending"
                >
                    <div class="groups__loader loader">
                        <div class="spinner" /> Загрузка данных
                    </div>
                </template>
                <template
                    v-else-if="groups && groups.count"
                >
                    <div class="groups__blocks">
                        <div
                            v-for="group in groups.results"
                            :key="group.id"
                            class="group"
                        >
                            <router-link
                                :to="{ name: 'group', params: { slug: group.slug } }"
                                class="group__title"
                            >
                                {{ group.name }}
                            </router-link>
                            <div class="group__info">
                                <div class="group__info-trades">
                                    Тендеров: <span class="group__info-red">{{ group.bidding_count }}/{{ group.tender_count }}</span>
                                </div>
                                <div class="group__info-trades">
                                    Товаров: <span class="group__info-red">{{ group.product_count }}</span>
                                </div>
                            </div>
                            <ul
                                class="group__products"
                            >
                                <li
                                    v-for="category in group.categories"
                                    :key="category.id"
                                    class="group__products-item"
                                >
                                    <router-link
                                        :to="{ name: 'group', params: { parentslug: group.slug, slug: category.slug } }"
                                        v-text="category.name"
                                    />
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
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as api } from "@/services"
    import Pagination from '@/components/pagination.vue'

    export default {
        name: 'Groups',
        components: {
            Pagination,
        },
        data() {
            return {
                groups: null,
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
                    this.getGroups()
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
                api.getCategoryList(params).then(res => {
                    this.groups = res
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            }
        },
    }
</script>
