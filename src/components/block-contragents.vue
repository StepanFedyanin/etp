<template>
    <div class="contragents__block">
        <div 
            v-if="!hideHeader"
            class="contragents__header"
            :class="user && user.id ? 'm--user' : ''"
        >
            <div class="contragents__header-cell m--name">
                Название
            </div>
            <div class="contragents__header-cell m--activity">
                Основной вид деятельности
            </div>
            <div class="contragents__header-cell m--customer">
                Заказчик
            </div>
            <div class="contragents__header-cell m--member">
                Участник
            </div>
            <div 
                v-if="user && user.id"
                class="contragents__header-cell m--favorite"
            />
        </div>
        <div class="contragents__list">
            <div class="contragents__list-inner">
                <div 
                    v-for="contragent in contragentsData"
                    :key="`customer-${contragent.id}`"
                    class="contragents__item"
                    :class="user && user.id ? 'm--user' : ''"
                    @click="onClickContragent(contragent.id)"
                >
                    <div class="contragents__item-cell m--name">
                        <div 
                            class="contragents__item-logo"
                            :class="contragent.logo ? '' : 'm--no-logo'"
                        >
                            <img 
                                v-if="contragent.logo"
                                :src="contragent.logo" 
                                :alt="contragent.name"
                            />
                        </div>
                        <div class="contragents__item-info">
                            <div class="m--name-name">
                                {{ contragent.name }}
                                <span class="m--name-city">
                                    {{ contragent.city }}
                                </span>
                            </div>
                            <div class="m--name-activity">
                                {{ contragent.principal_activity }}
                            </div>
                        </div>
                    </div>
                    <div class="contragents__item-cell m--customer">
                        <svg class="svg-icon svg-icon__hammer">
                            <use xlink:href="../assets/img/icons/icons.svg#hammer" />
                        </svg>
                        <span>{{ contragent.created_tenders_count }}</span>
                    </div>
                    <div class="contragents__item-cell m--member">
                        <svg class="svg-icon svg-icon__briefcase">
                            <use xlink:href="../assets/img/icons/icons.svg#briefcase" />
                        </svg>
                        <span>{{ contragent.participation_tenders_count }}</span>
                    </div>
                    <div 
                        v-if="user && user.id"
                        class="contragents__item-cell m--favorite"
                    >
                        <div
                            v-if="user.organization.id !== contragent.id"
                            class="contragents__item-favorite"
                            :class="{ 'm--favorite': contragent.is_favorite }"
                            @click.stop="toggleFavorite(contragent)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as userApi } from "@/services"
    export default {
        components: {
        },
        props: {
            contragents: {
                type: Array,
                default() { return []; }
            },
            hideHeader: {
                type: Boolean,
                default() { return false; }
            },
        },
        data() {
            return {
                contragentsData: this.contragents
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            },
            toggleFavorite(contragent) {
                contragent.is_favorite = !contragent.is_favorite;
                userApi.switchFavoriteOrganization(contragent.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
