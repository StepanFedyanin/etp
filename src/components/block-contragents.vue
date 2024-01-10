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
                                loading="lazy"
                            >
                        </div>
                        <div class="contragents__item-info">
                            <div class="m--name-name">
                                {{ contragent.name }}
                                <span class="m--name-inn">
                                    <span>ИНН:</span> {{ contragent.inn }}
                                </span>
                                <span 
                                    v-if="contragent.city"
                                    class="m--name-city"
                                >
                                    | {{ contragent.city }}
                                </span>
                            </div>
                            <div class="m--name-activity">
                                {{ contragent.principal_activity }}
                            </div>
                        </div>
                    </div>
                    <div class="contragents__item-cell m--customer">
                        <div class="svg-icon svg-icon__hammer" />
                        <span>{{ contragent.created_tenders_count }}</span>
                    </div>
                    <div class="contragents__item-cell m--member">
                        <div class="svg-icon svg-icon__briefcase" />
                        <span>{{ contragent.participation_tenders_count }}</span>
                    </div>
                    <div 
                        v-if="user && user.id"
                        class="contragents__item-cell m--favorite"
                    >
                        <div
                            v-if="user.organization?.id !== contragent.id"
                            :class="['contragents__item-favorite', (contragent.is_favorite) && 'm--favorite']"
                            @click.stop="toggleFavorite(contragent)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { toRef } from "vue"
    import { cabinet } from "@/services"
    export default {
        components: {
        },
        emits: ['updateData'],
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
                contragentsData: toRef(() => this.contragents)
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
                cabinet.switchFavoriteOrganization(contragent.id).then(res => {
                    this.$emit('updateData');
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            },
        }
    };
</script>
