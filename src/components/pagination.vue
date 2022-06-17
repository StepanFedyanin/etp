<template>
    <div class="pagination">
        <router-link
            :to="{ path: url, query: { page: goPrev } }"
            class="pagination__item pagination__item--prev"
            :class="{'m--disabled': isFirstPage}"
            :event="isFirstPage ? '' : 'click'"
        />
        <ul class="pagination__list">
            <li
                v-for="page in pages"
                :key="page"
                class="pagination__item"
                :class="{ 'pagination__item--current': page === currentPage }"
            >
                <router-link
                    class="pagination__link"
                    :to="{ path: url, query: { page: page } }"
                >
                    {{ page }}
                </router-link>
            </li>
        </ul>
        <router-link
            class="pagination__item pagination__item--next"
            :to="{ path: url, query: { page: goForward } }"
            :class="{'m--disabled': isLastPage}"
            :event="isLastPage ? '' : 'click'"
        />
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number,
                required: true
            },
            limit: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true,
                default: 1
            },
            url: {
                type: String,
                required: true
            }
        },
        data() {
            return {
            }
        },
        computed: {
            step() {
                return 1
            },
            pages() {
                const pagesCount = Math.ceil(this.total / this.limit)
                return this.$helpers.range(1, pagesCount)
            },
            goForward() {
                return `${this.currentPage + this.step}`
            },
            goPrev() {
                return `${this.currentPage - this.step}`
            },
            isLastPage() {
                return this.currentPage + 1 > this.pages.length
            },
            isFirstPage() {
                return this.currentPage <= 1
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
        },
    };
</script>
