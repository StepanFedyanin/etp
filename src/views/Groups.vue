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
                                Последний аукцион: <span class="group__info-red">{{ $helpers.formatDate(new Date(group.last_bidding), 'DD.MM.YYYY HH:mm') }} МСК</span>
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
                    <pagination
                        :total="groups.count"
                        :limit="limit"
                        :currentPage="currentPage"
                        :url="$route.path"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as api } from "@/services";
    import pagination from '@/components/pagination.vue';

    export default {
        name: 'Groups',
        components: {
            pagination,
        },
        data() {
            return {
                groups: null,
                limit: 5,
                currentPage: 1,
            };
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
                this.currentPage = Number(this.$route.query.page) || 1;
                let params = {
                    limit: this.limit,
                    offset: (this.currentPage - 1) * this.limit,
                }

                api.getCategoryList(params).then(res => {
                    this.groups = res
                    // console.log(res)
                }).catch(err => {
                    console.error(err)
                })
            }
        },
    };
</script>
