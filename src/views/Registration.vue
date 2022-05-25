<template>
    <div class="app__main">
        <organization-add-form
            v-if="isStage('search')"
            :item="item"
            :header="header"
            @next="searchOrg"
            @prev="prevPerson"
        />
        <modal
            v-if="modalCloseBrowser"
            :is-shown="modalCloseBrowser"
        >
            <h2
                slot="header"
                class="modal__header h2"
            >
                Работа с клиентом завершена
            </h2>
            <div
                slot="content"
                class="modal__content text"
            >
                <p>Работа с клиентом завершена</p>
                <p>Закройте окно браузера, операция завершена</p>
            </div>
        </modal>
    </div>
</template>

<script>
    import organizationAddForm from '@/components/registration/organization-add-form'
    import modal from "@/components/modal";

    export default {
        components: {
            modal,
            organizationAddForm
        },
        props: {
            header: {
                type: String,
                default() { return ''; }
            }
        },
        data() {
            return {
                stage: 'search',
                changeReason: undefined,
                result: undefined,
                modalCloseBrowser: false
            };
        },
        methods: {
            isStage(stage) {
                return this.stage === stage;
            },
            goTo(stage) {
                this.stage = stage;
            },
            serialize() {
                return this.item;
            },
            prev() {
                this.$emit('prev', this.serialize());
            },
            next() {
                this.$emit('next', this.serialize());
            },
            prevPerson() {
                this.prev();
            },
            searchOrg() {
                console.log('ff')
            },
            prevConfirm() {
                this.goTo('agents');
            }
        }
    };
</script>
