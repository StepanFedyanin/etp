<template>
    <Multiselect
        ref="multiselect"
        :options="options"
        :value="props.context._value"
        :mode="mode"
        :object="object"
        :multipleLabel="multipleLabel"
        :searchable="searchable"
        :minChars="minChars"
        :groups="groups"
        :groupSelect="groupSelect"
        :class="context.classes.multiselect"
        :placeholder="props.context.placeholder"
        :hideSelected="false"
        :close-on-select="closeOnSelect"
        :resolve-on-load="resolveOnLoad"
        :noOptionsText="noOptionsText"
        noResultsText="Результатов не найдено"
        @change="handleSelect"
        @search-change="searchChange"
        @open="handleOpen"
    >
        <template v-slot:option="{ option }">
            <div 
                v-if="inn"
                class="multiselect-inn"
                :class="option.color_status"
            >
                <div class="multiselect-inn__inner">
                    <div class="multiselect-inn__left">
                        <div class="multiselect-inn__inn">ИНН <span>{{ option.label }}</span></div>
                        <div class="multiselect-inn__kpp">КПП <span>{{ option.kpp }}</span></div>
                    </div>
                    <div class="multiselect-inn__right">
                        <div class="multiselect-inn__name-city">
                            <div class="multiselect-inn__name">
                                <span>{{ option.name }}</span>
                            </div>
                            <div class="multiselect-inn__city">
                                <span>{{ option.city }}</span>
                            </div>
                        </div>
                        <div class="multiselect-inn__principal_activity">
                            {{ option.principal_activity }}
                        </div>
                        <div class="multiselect-inn__legal_address">
                            {{ option.legal_address }}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                v-else-if="bet"
                class="multiselect-bet"
            >
                <div class="multiselect-bet__inner">
                    <div class="multiselect-bet__name">{{ option.label }}</div>
                    <div class="multiselect-bet__price">{{ $helpers.toPrice(option.price || 0, { sign: '₽', pointer: ',' }) }}</div>
                </div>
            </div>
        </template>
    </Multiselect>
</template>

<script setup>
    import { defineProps, ref, onUpdated } from 'vue';
    import Multiselect from '@vueform/multiselect';
    const props = defineProps({
        context: {
            type: Object,
            default: () => {}
        }
    });

    const options = props.context.options;
    //console.log('Options', options);
    const multiselect = ref(null)
    const mode = props.context.mode || 'single';
    const searchable = props.context.searchable || false;
    const minChars = props.context.attrs.minChars;
    const searchChange = props.context.attrs["search-change"] || handleSearchChange;
    const groups = props.context.attrs.groups || false;
    const groupSelect = props.context.attrs.groupSelect || false;
    const multipleLabel = props.context.multipleLabel || multipleLabelFunc;
    const noOptionsText = props.context.attrs.noOptionsText !== undefined ? props.context.attrs.noOptionsText : 'Список пуст';
    const closeOnSelect = props.context.attrs.closeOnSelect !== undefined ? props.context.attrs.closeOnSelect : true;
    const resolveOnLoad = props.context.attrs.resolveOnLoad !== undefined ? props.context.attrs.resolveOnLoad : true;
    const object = props.context.attrs.resolveOnLoad !== undefined ? true : false;
    const inn = props.context.attrs.inn !== undefined ? true : false;
    const bet = props.context.attrs.bet !== undefined ? true : false;
    // let vModelValue = reactive({})

    function handleOpen(select$) {
        console.log('handleOpen')
        if (props.context.attrs.bet) {
            multiselect._value.refreshOptions();
        }
    }

    function handleSelect(value, select$) {
        // console.log('handleSelect')
        props.context.node.input(value)
    }

    function multipleLabelFunc(value) {
        return value.length ? `Выбрано позиций: ${value.length}` : ''
    }

    function handleSearchChange(value, select$) {
    }

    onUpdated(() => {
        let v = props.context._value
        if (v && v.fromParent) {
            multiselect._value.clear()

            if (searchable)
                multiselect._value.clearSearch()

            if (Array.isArray(v.value) && !v.value.length)
                return

            if (v.value) {
                multiselect._value.select(v.value)
            }
        }
        console.log('onUpdated');
    })
</script>