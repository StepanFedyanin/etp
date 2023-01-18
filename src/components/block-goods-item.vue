<template>
    <div 
        class="goods__item"
    >
        <router-link
            :to="{ name: 'product', params: { slug: good.slug || '404' } }"
            class="goods__item-photo"
            :class="good.photo ? '' : 'm--no-photo'"
        >
            <div class="goods__item-photo-inner">
                <template
                    v-if="good.photo"
                >
                    <img 
                        :src="`${urlPath}${good.photo}`"
                        :alt="good.name"
                    />
                </template>
            </div>
        </router-link>
        <div 
            class="goods__item-info"
        >
            <div class="goods__item-price">
                {{ $helpers.toPrice(good.price, { sign: good.currency_detail }) }}
            </div>
            <div class="goods__item-desc">
                {{ good.name }}
            </div>
        </div>
        <router-link 
            v-if="showOrganization"
            :to="{ name: 'contragent', params: { id: good.organization.id } }"
            class="goods__item-organozation"
        >
            {{ good.organization.name }}
        </router-link>
        <a 
            v-if="showCategory"
            href="#"
            class="goods__item-category"
        >
            {{ good.category }}
        </a>
        <div 
            v-if="showControl"
            class="goods__item-control"
        >
            <a 
                href="#" 
                class="goods__item-control-link m--change"
                @click.prevent="addGood(good.slug)"
            >
                Изменить
            </a>
            <a 
                href="#" 
                class="goods__item-control-link m--delete"
                @click.prevent="deleteGood(good.slug)"
            >
                Удалить
            </a>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    export default {
        props: {
            good: {
                type: Object,
                default() { 
                    return {} 
                }
            },
            showCategory: {
                type: Boolean,
                default() { 
                    return false; 
                }
            },
            showOrganization: {
                type: Boolean,
                default() { 
                    return false; 
                }
            },
            showControl: {
                type: Boolean,
                default() { 
                    return false; 
                }
            },
        },
        data() {
            return {
                urlPath
            };
        },
        computed: {
        },
        created() {
        },
        methods: {
            addGood(slug) {
                this.$emit('addGood', slug);
            },
            deleteGood(slug) {
                this.$emit('deleteGood', slug);
            },
        }
    };
</script>
