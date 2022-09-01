<template>
    <div class="tender__related">
        <template
            v-if="tender.related_parent_tender"
        >
            <div class="tender__related-title">
                Основной тендер
            </div>
            <div class="tender__related-block">
                <div 
                    v-for="item in tender.related_parent_tender"
                    class="tender__related-item"
                >
                    <router-link
                        :to="{ name: 'tenders', params: { id: item.id } }"
                        class="tender__related-link"
                    >
                        №{{ item.id }}
                    </router-link>
                    <div>Срок исполнения: 24.07.2022</div>
                    <div>Исполнение договора</div>
                    <button class="button button-outline-green">
                        Подробнее
                    </button>
                </div>
            </div>
        </template>
        <template
            v-if="tender.related_tenders"
        >
            <div class="tender__related-title">
                Связанные тендеры
            </div>
            <div class="tender__related-block">
                <div 
                    v-for="item in tender.related_tenders"
                    class="tender__related-item"
                >
                    <router-link
                        :to="{ name: 'tenders', params: { id: item.id } }"
                        class="tender__related-link"
                    >
                        №{{ item.id }}
                    </router-link>
                    <div>Срок исполнения: 24.07.2022</div>
                    <div>Исполнение договора</div>
                    <button class="button button-outline-green">
                        Подробнее
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
        }
    }
</script>