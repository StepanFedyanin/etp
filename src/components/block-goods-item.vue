<template>
    <div 
        :class="['goods__item', blockClass]"
        @click.prevent="$router.push({ name: 'product', params: { slug: good.slug || '404' } })"
    >
        <template v-if="showOrganization && good.seller_id">
            <router-link 
                v-if="showOrganizationLink"
                :to="{ name: 'contragent', params: { id: good.seller_id } }"
                class="goods__item-organozation"
                @click.stop=""
            >
                {{ good.seller_detail }}
            </router-link>
            <div
                v-else
                class="goods__item-organozation"
            >
                {{ good.seller_detail }}
            </div>
        </template>
        <router-link
            :to="{ name: 'product', params: { slug: good.slug || '404' } }"
            :class="['goods__item-photo', !good.photo && 'm--no-photo']"
            :aria-label="good.name"
            @click.stop=""
        >
            <div class="goods__item-photo-inner">
                <img 
                    v-if="good.photo"
                    :src="good.photo"
                    :alt="good.name"
                    loading="lazy"
                >
            </div>
        </router-link>
        <template v-if="showCategory">
            <router-link
                v-if="good.category_detail?.slug"
                :to="{ name: 'products-group', params: { parentslug: good.category_detail.parent?.slug || 0, slug: good.category_detail.slug } }"
                class="goods__item-category"
                @click.stop=""
            >
                {{ good.category_detail.name }}
            </router-link>
            <div 
                v-else
                class="goods__item-category"
            >
                {{ good.category_detail }}
            </div>
        </template>
        <div class="goods__item-info">
            <div class="goods__item-desc">
                {{ good.name }}
            </div>
            <div class="goods__item-params">
                <div v-if="good.min_count" class="goods__item-param m--count">от {{ good.min_count }} ед.</div>
                <div v-if="good.nds" class="goods__item-param m--nds">{{ good.nds }}</div>
                <div v-if="good.type_of_buyer" class="goods__item-param m--buyer">{{ good.type_of_buyer === 'organization' ? 'B2B' : 'B2C' }}</div>
            </div>
            <div class="goods__item-price">
                {{ good.price ? $helpers.toPrice(good.price, { sign: good.currency_detail }) : 'Цена по запросу' }}
                <div v-if="good.unit" class="goods__item-price-unit">/ {{ good.unit }}</div>
            </div>
        </div>
        <div 
            v-if="showControl"
            class="goods__item-control"
        >
            <a 
                href="#" 
                class="goods__item-control-link m--change"
                @click.stop.prevent="$router.push({ name: 'market-good-edit', params: { goodId: good.id } })"
            >
                Изменить товар
            </a>
            <a 
                href="#" 
                class="goods__item-control-link m--delete"
                @click.stop.prevent="deleteGood(good.id)"
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
                urlPath,
                showOrganizationLink: false
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
