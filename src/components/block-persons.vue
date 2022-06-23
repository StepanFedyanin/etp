<template>
    <div
        :class="blockClass" 
        class="persons"
    >
        <div class="persons__item m--header">
            <div class="persons__item-cell">
                №
            </div>
            <div class="persons__item-cell">
                ФИО представителя
            </div>
            <div class="persons__item-cell">
                Должность
            </div>
            <div class="persons__item-cell">
                Email
            </div>
            <div class="persons__item-cell">
                Телефон
            </div>
            <div class="persons__item-cell" />
            <div class="persons__item-cell" />
        </div>
        <div 
            v-for="(item, index) in persons"
            class="persons__item"
        >
            <div class="persons__item-cell">
                {{ index + 1 }}
            </div>
            <div class="persons__item-cell">
                {{ item.full_name }}
            </div>
            <div class="persons__item-cell">
                {{ item.post }}
            </div>
            <div class="persons__item-cell">
                {{ item.email }}
            </div>
            <div class="persons__item-cell">
                {{ item.phone }}
            </div>
            <svg 
                v-if=" user.is_staff || user.is_master && user.organization.id == $store._state.data.user.organization.id"
                class="svg-icon svg-icon__edit"
                @click="onClickEditPerson(item.id)"
            >
                <use xlink:href="../assets/img/icons/icons.svg#edit" />
            </svg>
            <svg 
                v-if=" user.is_staff || user.is_master && user.organization.id == $store._state.data.user.organization.id"
                class="svg-icon svg-icon__delete"
                @click="onClickDeletePerson(item.id)"
            >
                <use xlink:href="../assets/img/icons/icons.svg#delete" />
            </svg>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";
    export default {
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            persons: {
                type: Array,
                default() { return []; }
            },
            user: {
                type: Object,
                default() { 
                    return {} 
                }
            }
        },
        data() {
            return {
                item: [],
            };
        },
        created() {
            // this.persons = this.item
        },
        methods: {
            onClickDeletePerson(id){
                api.deleteProfile(id).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.error(err);
                });
            },
            // onClickEditPerson(id){
            //     this.$router.push({ name: 'edit', params: { id: this.id } });
            // }
        }
    };
</script>
