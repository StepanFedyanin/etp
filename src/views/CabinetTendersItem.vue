<template>
    <div class="cabinet tenders">
        <div class="container">
            <div class="empty__content text">
                В разработке
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
        },
        methods: {
            onClickTender(id) {
                this.$router.push({ name: 'tender', params: { id: id } });
            }
        }
    };
</script>
