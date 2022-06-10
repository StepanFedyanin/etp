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
                                Последний аукцион: <span class="group__info-red">{{ $helpers.formatDate(new Date(group.last_bidding), 'DD.MM.YYYY HH:mm Z') }}</span>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { category as api } from "@/services";

    export default {
        name: 'Groups',
        components: {
        },
        data() {
            return {
                groups: null
            };
        },
        mounted() {
            api.getCategoryList().then(res => {
                this.groups = res
            }).catch(err => {
                console.error(err)
            })
        }
    };
</script>
