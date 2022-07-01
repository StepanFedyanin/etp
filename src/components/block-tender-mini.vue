<template>
    <div
        :class="blockClass" 
        class="tenders__item"
    >
        <div>номер {{ tender.id }}</div>
        <div>Статус {{ tender.status }}</div>
        
        <div>{{ tender.name }}</div>
        <div>{{ tender.category }}</div>
        <!-- {{ tender.region.name }} -->
        <span class="tenders__item-param-name">Дополнительная информация:</span> 
        <div 
            v-for="category in tender.category"
        >
            {{ category.name }}
        </div>
        <!-- {{ this.tender }} -->
    </div>
</template>
<script>
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            tender: {
                type: Object,
                default() { return {
                    // id: 1
                }; }
            }
        },
        // data() {
        //     return {
        //         category: undefined,
        //     }
        // },
    }
</script>