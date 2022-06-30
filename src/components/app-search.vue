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
                            id="query"
                            ref="query"
                            type="text"
                            name="query"
                            class="search__form-input"
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
                        Поиск
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
    import ModalSearch from '@/components/modal-search.vue'

    export default {
        name: 'Search',
        components: {
            ModalSearch
        },
        props: {
        },
        data() {
            return {
                showSearchModal: false,
                advSearchFormData: null
            };
        },
        computed: {
        },
        methods: {
            onClickShowSearchModal() {
                this.showSearchModal = true;
            },
            hideSearchModal() {
                this.showSearchModal = false;
            },
            advSearch(formData) {
                this.advSearchFormData = formData
                console.log(formData)
            },
            searchTenders(event) {
                let formData = Object.assign({}, this.advSearchFormData)
                formData.query = event.target.querySelector('#query').value
                this.$emit('startSearch', formData)
            }
        }
    };
</script>