<template>
    <div 
        v-if="total"
        class="pagination"
    >
        <div class="pagination__left">
            <router-link
                :to="{ path: url, query: Object.assign({}, query, { page: 1 }), hash: hash }"
                :class="['pagination__item m--first', isFirstPage && 'm--disabled']"
                :event="isFirstPage ? '' : 'click'"
            />
            <router-link
                :to="{ path: url, query: Object.assign({}, query, { page: goPrev }), hash: hash }"
                :class="['pagination__item m--prev', isFirstPage && 'm--disabled']"
                :event="isFirstPage ? '' : 'click'"
            />
            <ul class="pagination__list">
                <li
                    v-for="page in pagesArray"
                    :key="`page-${page.value}`"
                    :class="['pagination__item', page.value === currentPage && 'm--current']"
                >
                    <router-link
                        class="pagination__link"
                        :to="{ path: url, query: Object.assign({}, query, { page: page.value }), hash: hash }"
                        :event="page.value ? 'click' : ''"
                    >
                        {{ page.text }}
                    </router-link>
                </li>
            </ul>
            <router-link
                :to="{ path: url, query: Object.assign({}, query, { page: goForward }), hash: hash }"
                :class="['pagination__item m--next', isLastPage && 'm--disabled']"
                :event="isLastPage ? '' : 'click'"
            />
            <router-link
                :to="{ path: url, query: Object.assign({}, query, { page: pages.length }), hash: hash }"
                :class="['pagination__item m--last', isLastPage && 'm--disabled']"
                :event="isLastPage ? '' : 'click'"
            />
        </div>
        <div class="pagination__right">
            {{ 1 + limit * (currentPage - 1) }}-{{ (limit * currentPage > total) ? total : limit * currentPage }} из {{ total }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number,
                default() { return 0; }
            },
            limit: {
                type: Number,
                default() { return 10; }
            },
            currentPage: {
                type: Number,
                default() { return 1; }
            },
            query: {
                type: Object,
                default() { return {}; }
            },
            hash: {
                type: String,
                default() { return ''; }
            },
            url: {
                type: String,
                default() { return ''; }
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
                const pagesCount = Math.ceil(this.total / this.limit);
                return this.$helpers.range(1, pagesCount || 1);
            },
            pagesArray() {
                const count = Math.ceil(this.total / this.limit);
                let items = [];
                [ ...Array(count).keys() ].map(i => i + 1).forEach(item => {
                    //console.log(item);
                    if (count <= 7) {
                        items.push({ text: item, value: item });
                    } else {
                        if (item === 1 && this.currentPage > count - 5) {
                            items.push({ text: '1', value: 1 });
                            items.push({ text: '...', value: null });
                        } else if (item === count && this.currentPage < 5) {
                            items.push({ text: '...', value: null });
                            items.push({ text: count, value: count });
                        } else {
                            let deltaPrev = (count - this.currentPage < 3) ? 5 - (count - this.currentPage) : 3;
                            let deltaAfter = (this.currentPage < 3) ? 6 - this.currentPage : 3;
                            if (item > this.currentPage - deltaPrev && item < this.currentPage + deltaAfter) {
                                items.push({ text: item, value: item });
                            }
                        }
                    }
                });
                return items
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
