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
        <template 
            v-for="(item, index) in persons"
        >
            <div
                v-if="item.is_active || user.is_staff || (organization && user.organization && organization.id == user.organization.id)"
                :key="`person-${item.id}`"
                class="persons__item"
                :class="[item.is_active ? '' : 'not_active']"
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
                    {{ item.contact_email }}
                </div>
                <div class="persons__item-cell">
                    {{ item.phone }}
                </div>
                <div
                    v-if="user.is_staff || (user.is_master && organization && user.organization && organization.id == user.organization.id)"
                    class="cell-icons"
                >
                    <div 
                        class="svg-icon svg-icon__edit"
                        @click="onClickEditPerson(item.id)"
                    />
                    <div
                        v-if="item.is_active && item.id !== user.id && !item.is_staff"
                        class="svg-icon svg-icon__delete"
                        @click="onClickDeletePerson(item.id)"
                    />
                    <div 
                        v-else-if="!item.is_active"
                        class="svg-icon svg-icon__activate"
                        @click="onClickActivatePerson(item.id)"
                    />
                </div>
            </div>
        </template>
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
            organization: {
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
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            // this.persons = this.item
        },
        methods: {
            onClickDeletePerson(id) {
                api.deleteProfile(id).then(res => {
                    console.log(res);
                    this.$emit('updated');
                }).catch(err => {
                    console.error(err);
                });
            },
            onClickActivatePerson(id) {
                api.activateProfile(id).then(res => {
                    console.log(res);
                    this.$emit('updated');
                }).catch(err => {
                    console.error(err);
                });
            },
            onClickEditPerson(id){
                this.$router.push({ name: 'profile-edit-user', params: { id: id } });
            }
        }
    };
</script>
