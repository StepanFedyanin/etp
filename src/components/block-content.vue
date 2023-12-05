<template>
    <div 
        v-if="banners.length || hints.length"
        :class="['app__content', classModifier]"
    >
        <div 
            v-for="banner in banners"
            :key="`banner-${banner.id}`"
            class="app__content-banner"
        >
            <a 
                :href="banner.link"
                :target="banner.target ? '_blank' : '_self'"
            >
                <img 
                    :src="banner.image" 
                    :alt="banner.title" 
                />
            </a>
        </div>
        <div 
            v-for="hint in hints"
            :key="`hint-${hint.id}`"
            class="app__content-hint hint"
        >
            <div v-if="hint.subject" :class="['hint__title', `m--${hint.type}`]">{{ hint.subject }}</div>
            <div 
                class="hint__content text"
                v-html="hint.content"
            />
        </div>
    </div>
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
            name: {
                type: String,
                default() { return ''; }
            },
            place: {
                type: String,
                default() { return ''; }
            },
        },
        data() {
            return {
                hints: [],
                banners: []
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
            this.getBanner(`${this.name}_${this.place}`);
            this.getHint(`${this.name}_${this.place}`);
        },
        mounted() {
        },
        methods: {
            getHint(slug) {
                let params = { slug: slug };
                common.getHint(params).then(res => {
                    this.hints = res.results;
                }).catch(err => {
                    console.error(err)
                })
            },
            getBanner(slug) {
                this.showLoaderSending = true;
                let params = { banner_place: slug };
                common.getBanner(params).then(res => {
                    this.banners = res;
                }).catch(err => {
                    console.error(err)
                })
            },
        }
    };
</script>
