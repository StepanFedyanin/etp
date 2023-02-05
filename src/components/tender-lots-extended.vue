<template>
    <div class="tender__lots">
        <div class="tender__lots-title">
            Итоги тендера
        </div>
        <div 
            class="tender__lots-block"
        >
            <TenderLot
                v-for="lot in lots"
                :key="`lot-${lot.id}`" 
                :lot="lot"
                :tender="tender"
            />
        </div>
    </div>
</template>

<script>
    import TenderLot from '@/components/tender-lot';
    export default {
        components: {
            TenderLot
        },
        props: {
            tender: {
                type: Object,
                default() { return {}; }
            },
            lots: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {
                user: this.$store.state.user,
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
