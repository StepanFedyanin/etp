<template>
    <div class="search">
        <div class="search__inner">
            <div class="search__form">
                <form
                    class="search-form"
                    @submit.prevent=""
                >
                    <div class="search-form__group">
                        <div class="search-form__field">
                            <input
                                type="text"
                                class="search-form__input"
                                placeholder="Поиск торгово-закупочных процедур"
                            >
                        </div>
                        <div class="search-form__filter">
                            <button
                                type="button"
                                class="button button-red button-filter"
                            >
                                Фильтр
                            </button>
                        </div>
                    </div>
                    <div class="search-form__submit">
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
    </div>
</template>

<script>
    export default {
        name: 'AppSearch',
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