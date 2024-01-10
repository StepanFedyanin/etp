<template>
    <div 
        v-if="showLoaderSending"
        :class="['hint loader', classModifier]"
    >
        <div class="spinner m--sm" /> Загрузка данных
    </div>
    <template v-else>
        <div 
            v-for="hint in hints"
            :key="`hint-${hint.id}`"
            :class="['hint', classModifier]"
        >
            <div v-if="hint.subject" :class="['hint__title', `m--${hint.type}`]">{{ hint.subject }}</div>
            <div 
                class="hint__content text"
                v-html="hint.content"
            />
        </div>
    </template>
</template>

<script>
    import { common } from "@/services"
    export default {
        components: {
        },
        props: {
            classModifier: {
                type: String,
                default() { return ''; }
            },
            slug: {
                type: String,
                default() { return ''; }
            },
        },
        data() {
            return {
                hints: [],
                showLoaderSending: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
        },
        created() {
            this.getHint()
        },
        mounted() {
        },
        methods: {
            getHint() {
                this.showLoaderSending = true;
                let params = { slug: this.slug };
                common.getHint(params).then(res => {
                    this.hints = res.results;
                    this.showLoaderSending = false;
                }).catch(err => {
                    this.showLoaderSending = false;
                    console.error(err)
                })
            },
        }
    };
</script>
