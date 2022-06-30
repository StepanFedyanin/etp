<template>
    <div class="tender__lots lots">
        <div class="lots__header">
            <div class="lots__header-cell m--position">
                №
            </div>
            <div class="lots__header-cell m--name">
                Название
            </div>
            <div class="lots__header-cell m--nums">
                Кол/во
            </div>
            <div class="lots__header-cell m--unit">
                ед.изм
            </div>
            <div class="lots__header-cell m--tax">
                Ставка НДС
            </div>
            <div class="lots__header-cell m--price">
                Цена
            </div>
            <div class="lots__header-cell m--sum">
                Сумма, с учетом НДС
            </div>
        </div>
        <div class="lots__list">
            <div
                v-for="lot in lots"
                :key="`lot-${lot.id}`" 
                class="lots__item"
            >
                <div class="lots__item-cell m--position">
                    {{ lot.num }}
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
                <div class="lots__item-cell">
                    {{ lot.nds }}
                </div>
                <div class="lots__item-cell">
                    {{ $helpers.toPrice(lot.price, { sign: '₽', pointer: ',' }) }}
                </div>
                <div class="lots__item-cell">
                    {{ $helpers.toPrice(lot.quantity * lot.price, { sign: '₽', pointer: ',' }) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            lots: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {
            }
        },
        computed: {
        },
        mounted() {
        },
        created() {
        },
        methods: {
            AddLotOffer(id) {
                this.$emit('AddLotOffer', id);
            }
        },
    };
</script>
