<template>
    <div class="search">
        <div class="search__inner">
            <form
                class="search__form"
                @submit.prevent="searchTenders"
            >
                <div class="search__form-group">
                    <div class="search__form-field m--no-devider">
                        <input
                            v-model="formData.query"
                            type="text"
                            name="query"
                            class=""
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
    //import ModalSearch from '@/components/modal-search.vue'

    export default {
        name: 'Search',
        components: {
            //ModalSearch
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
            searchTenders(event) {
                //this.formData.query = this.$refs.query.value;
                this.$route.query = Object.assign({}, this.$route.query, this.formData);
                this.$emit('startSearch', this.formData);
            }
        }
    };
</script>