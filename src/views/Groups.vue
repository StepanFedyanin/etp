<template>
    <div class="app__main">
        <div class="groups">
            <div class="container">
                <div
                    v-if="groups && groups.count"
                    class="groups__blocks"
                >
                    <div
                        v-for="group in groups.results"
                        :key="group.id"
                        class="group"
                    >
                        <div class="group__title">
                            {{ group.name }}
                        </div>
                        <div class="group__info">
                            <div class="group__info-trades">
                                Активных торгов: <span class="group__info-red">{{ group.bidding_count }}</span>
                            </div>
                            <div class="group__info-date">
                                Последний аукцион: 
                                <span 
                                    v-if="group.last_bidding"
                                    class="group__info-red"
                                >{{ $helpers.formatDate(new Date(group.last_bidding), 'DD.MM.YYYY HH:mm') }} МСК
                                </span>
                                <span
                                    v-else
                                >
                                    —
                                </span>
                            </div>
                        </div>
                        <Transition name="">
                            <ul
                                v-show="group.isShowProducts"
                                class="group__products"
                            >
                                <li
                                    v-for="category in group.categories"
                                    :key="category.id"
                                    class="group__products-item"
                                    v-text="category.name"
                                />
                            </ul>
                        </Transition>
                        <div
                            class="group__toggle"
                            :class="{'group__toggle--active': group.isShowProducts}"
                            @click="group.isShowProducts = !group.isShowProducts"
                            v-text="group.isShowProducts ? 'Скрыть информацию' : 'Показать информацию'"
                        />
                    </div>
                    <Pagination
                        :total="groups.count"
                        :limit="Number(limit)"
                        :currentPage="Number($route.query.page || 1)"
                        :url="$route.path"
                    />
                </div>
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
            }
        },
        watch: {
            '$route.query.page': {
                immediate: true,
                handler() {
                    this.getGroupsFromApi()
                },
            }
        },
        mounted() {
        },
        methods: {
            getGroupsFromApi() {
                let page = Number(this.$route.query.page) || 1
                let params = {
                    limit: this.limit,
                    offset: (page - 1) * this.limit,
                }

                api.getCategoryList(params).then(res => {
                    this.groups = res
                    // console.log(res)
                }).catch(err => {
                    console.error(err)
                })
            }
        },
    }
</script>
