<template>
    <div 
        :class="['goods__item', blockClass]"
        @click.prevent="$router.push({ name: 'product', params: { slug: good.slug || '404' } })"
    >
        <router-link
            :to="{ name: 'product', params: { slug: good.slug || '404' } }"
            class="goods__item-photo"
            :class="['goods__item-photo', !good.photo && 'm--no-photo']"
            @click.stop=""
        >
            <div class="goods__item-photo-inner">
                <img 
                    v-if="good.photo"
                    :src="good.photo"
                    :alt="good.name"
                >
            </div>
        </router-link>
        <router-link 
            v-if="showOrganization && good.organization"
            :to="{ name: 'contragent', params: { id: good.organization.id } }"
            class="goods__item-organozation"
            @click.stop=""
        >
            {{ good.organization.name }}
        </router-link>
        <div class="goods__item-info">
            <div class="goods__item-desc">
                {{ good.name }}
            </div>
            <div class="goods__item-price">
                {{ $helpers.toPrice(good.price, { sign: good.currency_detail }) }}
            </div>
        </div>
        <router-link
            v-if="showCategory"
            :to="{ name: 'tenders-group', params: { parentslug: good.category_detail.parent?.slug || 0, slug: good.category_detail.slug } }"
            class="goods__item-category"
            @click.stop=""
        >
            {{ good.category_detail.name }}
        </router-link>
        <div 
            v-if="showControl"
            class="goods__item-control"
        >
            <a 
                href="#" 
                class="goods__item-control-link m--change"
                @click.stop.prevent="$router.push({ name: 'organization-good-edit', params: { slug: good.slug } })"
            >
                Изменить товар
            </a>
            <a 
                href="#" 
                class="goods__item-control-link m--delete"
                @click.stop.prevent="deleteGood(good.slug)"
            >
                Удалить
            </a>
        </div>
    </div>
</template>

<script>
    import { urlPath } from '@/settings'
    export default {
        emits: ['addGood', 'deleteGood'],
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
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
