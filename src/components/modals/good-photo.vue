<template>
    <q-no-ssr>
        <vue-final-modal 
            v-model="show"
            class="modal__container" 
            content-class="modal__block m--long"
            content-transition="vfm-fade"
            overlay-transition="vfm-fade"
            :clickToClose="false"
            @click-outside="$emit('hideModal')"
        >
            <button 
                class="modal__close" 
                @click="$emit('hideModal')"
            >
                <span />
            </button>
            <div class="modal__photo">
                <div class="modal__photo-inner">
                    <img :src="photo.photo" alt="" />
                </div>
            </div>
        </vue-final-modal>
    </q-no-ssr>
</template>

<script>
    //import { urlPath } from '@/settings';
    export default {
        props: {
            showModal: {
                type: Boolean,
                default() { return false; }
            },
            photo: {
                type: Object,
                default() { return {}; }
            },
        },
        data() {
            return {
                //urlPath,
            };
        },
        computed: {
            show() {
                return this.showModal;
            },
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
