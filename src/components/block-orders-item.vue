<template>
    <div :class="['orders__item', !showMore && 'm--short']">
        <div 
            class="orders__item-inner"
            @click.prevent="toggleOpenItem(index)"
        >
            <div 
                v-if="showMore"
                class="orders__item-cell"
            >
                <span :class="['icon', openedItem[index] ? 'm--arrow-up' : 'm--arrow-down']" />
            </div>
            <div class="orders__item-cell m--strong m--col">
                {{ $helpers.formatDate(new Date(item.created), 'DD.MM.YY', 'Europe/Moscow') }}
                <span>#{{ item.id }}</span>
            </div>
            <div class="orders__item-cell">
                Товар: {{ item.product }}
            </div>
            <div class="orders__item-cell m--col">
                Покупатель: {{ item.buyer }}
                <span class="orders__item-buyer m--org">Организация</span>
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
            :class="['orders__item-more', openedItem[index] ? 'is-opened' : '']"
        >
            <div class="orders__item-more-block">
                <div class="orders__item-more-params">
                    <div class="orders__item-more-param">
                        Имя <span>{{ item.name || '—' }}</span>
                    </div>
                    <div class="orders__item-more-param">
                        Контактный телефон <span>{{ item.contact_phone || '—' }}</span>
                    </div>
                    <div class="orders__item-more-param">
                        Контактный email <span>{{ item.contact_email || '—' }}</span>
                    </div>
                </div>
                <div class="orders__item-more-params">
                    <div class="orders__item-more-param">
                        Комментарий <span>{{ item.comment || '—' }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <ModalPersonMaster
            :key="`modal-master-${person.id}`"
            :organization="organization"
            :person="person"
            :showModal="showPersonMasterModal"
            @hideModal="hidePersonMasterModal"
        />            
        <ModalPersonExclude
            :key="`modal-exclude-${person.id}`"
            :organization="organization"
            :person="person"
            :showModal="showPersonExcludeModal"
            @hideModal="hidePersonExcludeModal"
        />            
        <ModalPersonPassword
            :key="`modal-password-${person.id}`"
            :organization="organization"
            :person="person"
            :showModal="showPersonPasswordModal"
            @hideModal="hidePersonPasswordModal"
        />
        -->            
    </div>
</template>

<script>
    import { cabinet } from "@/services";
    //import ModalPersonMaster from '@/components/modals/person-master';
    //import ModalPersonExclude from '@/components/modals/person-exclude';
    //import ModalPersonPassword from '@/components/modals/person-password';

    export default {
        components: {
            //ModalPersonMaster,
            //ModalPersonExclude,
            //ModalPersonPassword
        },
        emits: ['updateData'],
        props: {
            blockClass: {
                type: String,
                default() { return ''; }
            },
            order: {
                type: Object,
                default() { 
                    return {} 
                }
            },
        },
        data() {
            return {
                item: this.order,
                openedItem: {},
                showPersonMasterModal: false,
                showPersonExcludeModal: false,
                showPersonPasswordModal: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            showMore() {
                return true;
                //return (this.organization?.id == this.user.organization?.id);
            },
            /*
            showActions() {
                return this.user.is_staff || (this.user.is_master && this.organization && this.user.organization && this.organization.id == this.user.organization.id);
            }
            */
        },
        created() {
            // this.persons = this.item
        },
        methods: {
            toggleOpenItem(index) {
                this.openedItem[index] ? delete this.openedItem[index] : this.openedItem[index] = 1;
            },
            onSwitchPersonParam(params) {
                cabinet.updateMyOrganizationMemberPartial(params).then(res => {
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
            onClickPersonExclude(item) {
                console.log('onClickPersonExclude');
                this.person = item;
                this.showPersonExcludeModal = true;
            },
            onClickPersonPassword(item) {
                console.log('onClickPersonPassword');
                this.person = item;
                this.showPersonPasswordModal = true;
            },
            onClickDeletePerson(id) {
                cabinet.deleteProfile(id).then(res => {
                    console.log(res);
                    this.$emit('updated');
                }).catch(err => {
                    console.error(err);
                });
            },
            onClickActivatePerson(id) {
                cabinet.activateProfile(id).then(res => {
                    console.log(res);
                    this.$emit('updated');
                }).catch(err => {
                    console.error(err);
                });
            },
            onClickEditPerson(id) {
                this.$router.push({ name: 'organization-person-edit', params: { personId: id } });
            },
            hidePersonMasterModal(updateData) {
                this.showPersonMasterModal = false;
                if (updateData) this.$emit('updateData');
            },
            hidePersonExcludeModal(updateData) {
                this.showPersonExcludeModal = false;
                if (updateData) this.$emit('updateData');
            },
            hidePersonPasswordModal(updateData) {
                this.showPersonPasswordModal = false;
                if (updateData) this.$emit('updateData');
            },
        }
    };
</script>
