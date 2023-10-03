<template>
    <div :class="['persons', blockClass]">
        <div :class="['persons__item m--header', !showMore && 'm--short']">
            <div class="persons__item-inner">
                <div v-if="showMore" class="persons__item-cell" />
                <div class="persons__item-cell">
                    ФИО
                </div>
                <div class="persons__item-cell">
                    Email
                </div>
                <div class="persons__item-cell">
                    Телефон
                </div>
                <div v-if="showActions" class="persons__item-cell" />
            </div>
        </div>
        <template 
            v-for="(item, index) in persons"
        >
            <div
                v-if="item.is_active || user.is_staff || (organization?.id == user.organization?.id)"
                :key="`person-${item.id}`"
                :class="['persons__item', !item.is_active && 'm--not-active', !showMore && 'm--short']"
            >
                <div 
                    class="persons__item-inner"
                    @click.prevent="toggleOpenItem(index)"
                >
                    <div 
                        v-if="showActions"
                        class="persons__item-cell"
                    >
                        <span :class="['icon', openedItem[index] ? 'm--arrow-up' : 'm--arrow-down']" />
                    </div>
                    <div class="persons__item-cell m--strong">
                        {{ item.full_name }} <span>{{ item.is_master ? 'Администратор' : '' }}</span>
                    </div>
                    <div class="persons__item-cell">
                        {{ item.contact_email || '—' }}
                    </div>
                    <div class="persons__item-cell">
                        {{ item.contact_phone || '—' }}
                    </div>
                    <div 
                        v-if="showMore"
                        class="persons__item-cell m--icons"
                    >
                        <span :class="['icon m--perms-org', item.is_access_organization && 'm--on']" />
                        <span :class="['icon m--perms-goods', item.is_access_product && 'm--on']" />
                        <span :class="['icon m--perms-tenders', item.is_access_tender && 'm--on']" />
                    </div>

                    <!--div
                        v-if="user.is_staff || (user.is_master && organization && user.organization && organization.id == user.organization.id)"
                        class="cell-icons"
                    >
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
                    </div-->
                </div>
                <div 
                    v-if="showMore"
                    :class="['persons__item-more', openedItem[index] ? 'is-opened' : '']"
                >
                    <div class="persons__item-more-block">
                        <div class="persons__item-more-params">
                            <div class="persons__item-more-param">
                                Email (аккаунт) <span>{{ item.email || '—' }}</span>
                            </div>
                            <div class="persons__item-more-param">
                                Контактный email <span>{{ item.contacts_email || '—' }}</span>
                            </div>
                            <div class="persons__item-more-param">
                                Должность / специализация <span>{{ item.post || '—' }}</span>
                            </div>
                        </div>
                        <div class="persons__item-more-params">
                            <div class="persons__item-more-param">
                                Телефон (аккаунт) <span>{{ item.phone || '—' }}</span>
                            </div>
                            <div class="persons__item-more-param">
                                Контактный телефон <span>{{ item.contacts_phone || '—' }}</span>
                            </div>
                        </div>
                        <div 
                            v-if="showActions"
                            class="persons__item-more-params m--right"
                        >
                            <div class="persons__item-more-param">
                                <span>Права на управление:</span>
                            </div>
                            <div class="persons__item-more-param field m--inline" data-type="checkbox-switch">
                                <label class="field__inner">
                                    <span :class="['icon m--perms-org', item.is_access_organization && 'm--on']" />
                                    <span>Организацией</span>
                                    <div class="field__input">
                                        <input
                                            v-model="item.is_access_organization"
                                            type="checkbox"
                                            :disabled="item.is_master"
                                            @change="onSwitchPersonParam({ id: item.id, is_access_organization: item.is_access_organization })"
                                        />
                                        <span class="field__decorator" />
                                    </div>
                                </label>
                            </div>
                            <div class="persons__item-more-param field m--inline" data-type="checkbox-switch">
                                <label class="field__inner">
                                    <span :class="['icon m--perms-goods', item.is_access_product && 'm--on']" />
                                    <span>Товарами</span>
                                    <div class="field__input">
                                        <input
                                            v-model="item.is_access_product"
                                            type="checkbox"
                                            :disabled="item.is_master"
                                            @change="onSwitchPersonParam({ id: item.id, is_access_product: item.is_access_product })"
                                        />
                                        <span class="field__decorator" />
                                    </div>
                                </label>
                            </div>
                            <div class="persons__item-more-param field m--inline" data-type="checkbox-switch">
                                <label class="field__inner">
                                    <span :class="['icon m--perms-tenders', item.is_access_tender && 'm--on']" />
                                    <span>Тендерами</span>
                                    <div class="field__input">
                                        <input
                                            v-model="item.is_access_tender"
                                            type="checkbox"
                                            :disabled="item.is_master"
                                            @change="onSwitchPersonParam({ id: item.id, is_access_tenders: item.is_access_tenders })"
                                        />
                                        <span class="field__decorator" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div 
                        v-if="showActions"
                        class="persons__item-more-links"
                    >
                        <div class="persons__item-more-link field m--inline" data-type="checkbox-switch">
                            <label class="field__inner m--color-red">
                                Назначить администратором
                                <div class="field__input">
                                    <input
                                        v-model="item.is_master"
                                        type="checkbox"
                                        @click.prevent="onSwitchPersonMaster(item)"
                                    />
                                    <span class="field__decorator" />
                                </div>
                            </label>
                        </div>
                        <a 
                            href="#" 
                            class="persons__item-more-link"
                            @click.prevent="onClickEditPerson(item.id)"
                        >
                            Редактировать профиль
                        </a>
                        <a 
                            href="#" 
                            class="persons__item-more-link"
                        >
                            Изменить пароль
                        </a>
                        <a 
                            href="#" 
                            class="persons__item-more-link m--color-red"
                        >
                            Исключить из организации
                        </a>
                    </div>
                </div>
            </div>
        </template>
        <ModalPersonMaster
            :key="`modal-master-${person.id}`"
            :organization="organization"
            :person="person"
            :showModal="showPersonMasterModal"
            @hideModal="hidePersonMasterModal"
        />            
    </div>
</template>

<script>
    import { user as api } from "@/services";
    import ModalPersonMaster from '@/components/modals/person-master';

    export default {
        components: {
            ModalPersonMaster
        },
        emits: ['updateData'],
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
            },
        },
        data() {
            return {
                person: {},
                item: [],
                openedItem: {},
                showPersonMasterModal: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            showMore() {
                return (this.organization?.id == this.user.organization?.id);
            },
            showActions() {
                return this.user.is_staff || (this.user.is_master && this.organization && this.user.organization && this.organization.id == this.user.organization.id);
            }
        },
        created() {
            // this.persons = this.item
        },
        methods: {
            toggleOpenItem(index) {
                this.openedItem[index] ? delete this.openedItem[index] : this.openedItem[index] = 1;
            },
            onSwitchPersonParam(params) {
                api.updateProfile(params).then(res => {
                    console.log(res);
                    //this.$emit('updated');
                }).catch(err => {
                    console.error(err);
                });
            },
            onSwitchPersonMaster(item) {
                console.log('onSwitchPersonMaster');
                this.person = item;
                this.showPersonMasterModal = true;
            },
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
            },
            hidePersonMasterModal(updateData) {
                this.showPersonMasterModal = false;
                if (updateData) this.$emit('updateData');
            },

        }
    };
</script>
