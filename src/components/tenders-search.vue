<template>
    <div class="search">
        <div class="search__inner">
            <form
                class="search__form"
                @submit.prevent="searchTenders"
            >
                <div class="search__form-group">
                    <div class="search__form-field">
                        <input
                            v-model="formData.query"
                            type="text"
                            name="query"
                            class="search__form-input m--no-shadow"
                            placeholder="Поиск торгово-закупочных процедур"
                        >
                    </div>
                    <div class="search__form-filter">
                        <button
                            type="button"
                            class="button button-outline-white button-filter"
                            @click="onClickShowSearchModal"
                        >
                            Расширенный поиск
                        </button>
                    </div>
                </div>
                <div class="search__form-submit">
                    <button
                        type="submit"
                        class="button button-green"
                    >
                        Найти
                    </button>
                </div>
            </form>
        </div>

        <ModalSearch
            :showModal="showSearchModal"
            @hideModal="hideSearchModal"
            @advSearch="advSearch"
        />
    </div>
</template>

<script>
    import ModalSearch from '@/components/modals/search.vue'

    export default {
        name: 'Search',
        components: {
            ModalSearch
        },
        props: {
        },
        data() {
            return {
                formData: {
                    query: this.$route.query.query
                },
                showSearchModal: false,
                modalFormData: null
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
            onClickShowSearchModal() {
                this.showSearchModal = true;
            },
            hideSearchModal() {
                this.showSearchModal = false;
            },
            advSearch(formData) {
                this.modalFormData = formData
            },
            searchTenders(event) {
                //let query = this.$route.query;
                //delete query.page;
                //this.$router.replace({});
                this.$route.query = Object.assign({}, this.formData, this.modalFormData);
                this.formData = Object.assign({}, this.modalFormData, this.formData);
                this.$emit('startSearch', this.formData)
            }
        }
    };
</script>