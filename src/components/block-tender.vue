<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div
            class="tenders__item-favorite"
            :class="{ 'm--favorite': favorite }"
            @click="toggleFavorite"
        />
        <div class="tenders__item-left">
            <router-link
                :to="{ name: 'tender', params: { id: this.tender.id } }"
                class="tenders__item-title"
            >
                {{ tender.name }}
            </router-link>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Заказчик: </span> 
                <a href="#">{{ tender.organization && tender.organization.full_name ? tender.organization.full_name : '(())' }}</a>
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Категории: </span>
                <span
                    v-for="(category, idx) in tender.category"
                    :key="category.id"
                    class="tenders__item-param-value"
                >
                    {{ category.name }}
                    <span v-if="idx != Object.keys(tender.category).length - 1">, </span>
                </span>
            </div>
            <div
                v-if="tender.region"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Регион:</span> {{ tender.region.name }}
            </div>
            <div
                v-if="tender.description"
                class="tenders__item-param"
            >
                <span class="tenders__item-param-name">Дополнительная информация:</span> {{ tender.description }}
            </div>
            <div
                v-if="documents"
                class="tenders__item-docs"
            >
                <div class="tenders__item-docs__title">
                    Документы:
                </div>
                <div class="tenders__item-docs__list">
                    <div class="tenders__item-docs__item">
                        <div class="tenders__item-docs__cell m--title">
                            Файл
                        </div>
                        <div class="tenders__item-docs__cell m--title">
                            Описание
                        </div>
                    </div>
                    <div
                        v-for="file in documents"
                        :key="file.id"
                        class="tenders__item-docs__item m--file"
                    >
                        <a
                            :href="urlPath + file.file"
                            class=""
                        >{{ file.name }}</a>
                        <div class="">
                            {{ file.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tenders__item-right">
            <div class="tenders__item-price">
                {{ $helpers.toPrice(tender.price, {sign: '₽'}) }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Аукцион №{{ tender.id }}</span>
            </div>
            <div class="tenders__item-param">
                <span
                    v-if="tender.date_start" 
                    class="tenders__item-param-name">Объявлено:</span> {{ $helpers.formatDate(new Date(tender.date_start), 'DD.MM.YYYY HH:mm') }} МСК
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Тип аукциона:</span> {{ tender.type_detail }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Лоты:</span> {{ tender.lot_count }}
            </div>
            <div class="tenders__item-param">
                <span class="tenders__item-param-name">Предложений от поставщиков:</span> ?
            </div>
            <div
                class="tenders__item-timer"
            >
                <div
                    v-if="tender.date_end" 
                    class="tenders__item-timer-date">
                    Прием заявок: {{ $helpers.formatDate(new Date(tender.date_end), 'DD.MM.YYYY HH:mm') }} МСК
                </div>
                <div
                    v-if="restTime"
                    class="tenders__item-timer-left"
                >
                    Осталось {{ $helpers.dateRangeToDaysHours(new Date(), new Date(tender.date_end)) }}
                </div>
            </div>
            <div
                v-if="restTime"
                class="tenders__item-participate"
            >
                <button
                    class="button button-green"
                    @click="onClickParticipate"
                >
                    Участвовать
                </button>
            </div>
        </div>
        <div
            v-if="lots"
            class="tenders__item-lots lots m--tenders"
            :class="{'m--active': isShowPositions}"
        >
            <div class="lots__header">
                <div class="lots__header-cell m--position">
                    №
                </div>
                <div class="lots__header-cell m--name">
                    Описание
                </div>
                <div class="lots__header-cell m--nums">
                    Кол/во
                </div>
                <div class="lots__header-cell m--unit">
                    ед.изм
                </div>
            </div>
            <div class="lots__list">
                <div
                    v-for="(lot, idx) in lots"
                    :key="lot.id"
                    class="lots__item"
                >
                    <div class="lots__item-cell m--position">
                        {{ idx + 1 }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.name }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.quantity }}
                    </div>
                    <div class="lots__item-cell">
                        {{ lot.unit }}
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="lots.length > 5"
            class="tenders__item-toggle"
            :class="{'tenders__item-toggle--active': isShowPositions}"
            @click="isShowPositions = !isShowPositions"
        >
            <template
                v-if="isShowPositions"
            >
                Скрыть {{ $helpers.stringForNumber(lots.length - 5, ['позицию', 'позиции', 'позиций']) }}
            </template>
            <template
                v-else
            >
                Показать {{ $helpers.stringForNumber(lots.length - 5, ['позицию', 'позиции', 'позиций']) }}
            </template>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    import { tender as tenderApi } from "@/services"

    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    id: 1
                }; }
            }
        },
        data() {
            return {
                urlPath,
                isShowPositions: false,
                favorite: false
            };
        },
        computed: {
            documents() {
                if (this.tender.documents.length)
                    return this.tender.documents.filter(file => file.publication)
                
                return false
            },
            lots() {
                if (this.tender.lots.length)
                    return this.tender.lots.filter(lot => lot.publication)
                
                return false
            },
            restTime() {
                let rest = new Date(this.tender.date_end) - new Date()
                return (rest < 0) ? false : true;
            }
        },
        methods: {
            onClickParticipate() {
                this.$router.push({ name: 'tender', params: { id: this.tender.id } });
            },
            toggleFavorite() {
                this.favorite = !this.favorite
                tenderApi.switchFavoriteTender(this.tender.id).then(res => {
                    console.log(res);
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                    console.error(err);
                });
            }
        },
    };
</script>
