<template>
    <div
        :class="blockClass" 
        class="persons"
    >
        <div class="persons__item m--header">
            <div class="persons__item-cell">
                №
            </div>
            <div class="persons__item-cell">
                ФИО представителя
            </div>
            <div class="persons__item-cell">
                Должность
            </div>
            <div class="persons__item-cell">
                Email
            </div>
            <div class="persons__item-cell">
                Телефон
            </div>
        </div>
        <div 
            v-for="(item, index) in persons"
            class="persons__item"
        >
            <div class="persons__item-cell">
                {{ index + 1 }}
            </div>
            <div class="persons__item-cell">
                {{ item.name }}
            </div>
            <div class="persons__item-cell">
                {{ item.post }}
            </div>
            <div class="persons__item-cell">
                {{ item.email }}
            </div>
            <div class="persons__item-cell">
                {{ item.phone }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            persons: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {
            };
        },
        methods: {
        }
    };
</script>
