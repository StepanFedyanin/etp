<template>
    <div class="search">
        <div class="search__inner">
            <form
                class="search__form"
                @submit.prevent="searchProducts"
            >
                <div class="search__form-group">
                    <div class="search__form-field">
                        <input
                            v-model="formData.search"
                            type="text"
                            name="search"
                            class="search__form-input m--no-shadow"
                            placeholder="Поиск по товарам"
                        >
                    </div>
                    <!--div class="search__form-filter">
                        <button
                            type="button"
                            class="button button-outline-white button-filter"
                            @click="onClickShowSearchModal"
                        >
                            Расширенный поиск
                        </button>
                    </div-->
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

        <!--ModalSearch
            :showModal="showSearchModal"
            @hideModal="hideSearchModal"
            @advSearch="advSearch"
        /-->
    </div>
</template>

<script>
    //import ModalSearch from '@/components/modals/search.vue'

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
                    search: this.$route.query.query
                },
                showSearchModal: false,
                modalFormData: null
            };
        },
        computed: {
        },
        watch: {
            '$route.query.search': {
                handler() {
                    this.formData = {
                        search: this.$route.query.search
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
            searchProducts(event) {
                this.$route.query = Object.assign({}, this.formData);
                //this.formData = Object.assign({}, this.modalFormData, this.formData);
                this.$emit('startSearch', this.formData)
            }
        }
    };
</script>