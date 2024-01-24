<template>
    <div :class="['orders__item', !showMore && 'm--short']">
        <div 
            class="orders__item-inner"
            @click.prevent="toggleOpenItem"
        >
            <div 
                v-if="showMore"
                class="orders__item-cell"
            >
                <span :class="['icon', openedItem ? 'm--arrow-up' : 'm--arrow-down']" />
            </div>
            <div class="orders__item-cell m--strong m--col">
                {{ $helpers.formatDate(new Date(item.created), 'DD.MM.YY', 'Europe/Moscow') }}
                <span>#{{ item.id }}</span>
            </div>
            <div class="orders__item-cell m--col">
                <div class="m--strong">{{ item.product_json?.name }}</div>
                <div class="orders__item-params">
                    <div class="orders__item-param">
                        {{ item.product_json?.price ? $helpers.toPrice(item.product_json?.price, { sign: item.product_json?.currency_detail }) : 'Цена по запросу' }} / {{ item.product_json?.unit }}
                    </div>
                    <div class="goods__item-param m--count">{{ item.count }} {{ item.product_json?.unit }}</div>
                    <div v-if="item.product_json?.price" class="orders__item-param">
                        {{ $helpers.toPrice(item.product_json?.price * item.count, { sign: item.product_json?.currency_detail }) }}
                    </div>
                </div>
            </div>
            <div class="orders__item-cell m--col">
                <span class="m--strong">{{ item[type === 'seller' ? 'buyer' : 'seller'].name }}</span>
                <template v-if="item[type === 'seller' ? 'buyer' : 'seller'].type === 'organization'">
                    <span class="orders__item-buyer m--org">Организация</span>
                </template>
                <template v-else>
                    <span class="orders__item-buyer m--person">Физ. лицо</span>
                </template>
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
            :class="['orders__item-more', openedItem ? 'is-opened' : '']"
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
            type: {
                type: String,
                default() { return 'seller'; }
            },
        },
        data() {
            return {
                item: this.order,
                openedItem: false,
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
            toggleOpenItem() {
                this.openedItem = !this.openedItem;
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
