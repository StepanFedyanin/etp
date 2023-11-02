<template>
    <div class="search">
        <div class="search__inner">
            <form
                class="search__form"
                @submit.prevent="searchHandler"
            >
                <div class="search__form-group">
                    <div class="search__form-field">
                        <input
                            v-model="formData.query"
                            type="text"
                            name="query"
                            class="search__form-input m--no-shadow"
                            placeholder="Поиск контрагентов"
                        >
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
        name: 'Search',
        components: {
        },
        props: {
        },
        data() {
            return {
                formData: {
                    query: this.$route.query.query
                }
            };
        },
        computed: {
        },
        watch: {
            '$route.query.query': {
                handler() {
                    this.formData = {
                        query: this.$route.query.query
                    }
                },
            }
        },
        methods: {
            async searchHandler() {
                let query = Object.assign({}, this.$route.query, this.formData);
                delete query.page;
                await this.$router.replace({ query: query });
                this.$emit('startSearch');
            }
        }
    };
</script>