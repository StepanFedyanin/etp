<template>
    <div class="groups__list">
        <div 
            v-for="group in groups"
            :key="`group-${group.id}`"
            class="groups__list-item"
        >
            <Popper
                v-if="group.categories?.length"
                placement="right-start"
                offsetDistance="32"
                offsetSkid="0"
            >
                <div class="groups__list-item-inner">
                    <div class="groups__list-item-name">{{ group.name }}</div>
                    <div class="groups__list-item-stat"><span>{{ group.bidding_count }}</span>/{{ group.tender_count }}</div>
                </div>
                <template #content="{ close }">
                    <div class="groups__list-item-block">
                        <a 
                            href="#" 
                            class="groups__list-item-block-close"
                            @click.prevent="close"
                        />
                        <router-link
                            :to="{ name: 'tenders-group', params: { slug: group.slug } }"
                            class="groups__list-item-title"
                        >
                            {{ group.name }}
                        </router-link>
                        <div class="groups__list-item-block-inner">
                            <router-link 
                                v-for="category in group.categories"
                                :key="`group-${category.id}`"
                                :to="{ name: 'tenders-group', params: { parentslug: group.slug, slug: category.slug } }"
                                class="groups__list-subitem"
                            >
                                <div class="groups__list-subitem-name">{{ category.name }}</div>
                                <div class="groups__list-subitem-stat"><span>{{ category.bidding_count }}</span>/{{ category.tender_count }}</div>
                            </router-link>
                        </div>
                    </div>
                </template>
            </Popper>
            <router-link
                v-else-if="parent"
                :to="{ name: 'tenders-group', params: { parentslug: parent.slug, slug: group.slug } }" 
                class="groups__list-item-inner"
            >
                <div class="groups__list-item-name">{{ group.name }}</div>
                <div class="groups__list-item-stat"><span>{{ group.bidding_count }}</span>/{{ group.tender_count }}</div>
            </router-link>
            <router-link
                v-else
                :to="{ name: 'tenders-group', params: { slug: group.slug } }" 
                class="groups__list-item-inner"
            >
                <div class="groups__list-item-name">{{ group.name }}</div>
                <div class="groups__list-item-stat"><span>{{ group.bidding_count }}</span>/{{ group.tender_count }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    //import { cabinet } from "@/services";

    export default {
        components: {
        },
        props: {
            parent: {
                type: Object,
                default() { return null; }
            },
            groups: {
                type: Array,
                default() { return []; }
            },
        },
        data() {
            return {};
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
        },
        methods: {
        }
    };
</script>
