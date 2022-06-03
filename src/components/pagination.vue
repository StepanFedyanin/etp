<template>
    <div class="pagination">
        <button
            class="pagination__item pagination__item--prev"
            :disabled="current === 1"
            @click="false"
        />
        <ul class="pagination__list">
            <li
                v-for="(page, index) in pageCount"
                :key="'page-' + index"
                class="pagination__item"
                :class="{ 'pagination__item--current': page === current }"
                @click="false"
            >
                {{ page }}
            </li>
        </ul>
        <button
            class="pagination__item pagination__item--next"
            :disabled="current === pageCount"
            @click="false"
        />
    </div>
</template>

<script>
    export default {
        props: {
            current: {
                type: Number,
                default: 1
            },
            pageCount: {
                type: Number,
                default: 4
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
        }
    };
</script>
