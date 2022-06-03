<template>
    <div class="search">
        <div class="search__inner">
            <form
                class="search__form"
                @submit.prevent=""
            >
                <div class="search__form-group">
                    <div class="search__form-field">
                        <input
                            type="text"
                            class="search__form-input"
                            placeholder="Поиск торгово-закупочных процедур"
                        >
                    </div>
                    <div class="search__form-filter">
                        <button
                            type="button"
                            class="button button-red button-filter"
                        >
                            Фильтр
                        </button>
                    </div>
                </div>
                <div class="search__form-submit">
                    <button
                        type="submit"
                        class="button button-green"
                    >
                        Поиск
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'search',
        components: {
        },
        props: {
        },
        data() {
            return {
            };
        },
        computed: {
        },
    };
</script>