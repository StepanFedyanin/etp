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
        :canDeselect="canDeselect"
        :canClear="canClear"
        :groups="groups"
        :groupSelect="groupSelect"
        :class="context.classes.multiselect"
        :placeholder="props.context.placeholder"
        :hideSelected="false"
        :close-on-select="closeOnSelect"
        :resolve-on-load="resolveOnLoad"
        :filter-results="filterResults"
        :infinite="infinite"
        :limit="limit"
        :delay="delay"
        :noOptionsText="noOptionsText"
        :readonly="props.context.attrs.readonly"
        noResultsText="Результатов не найдено"
        @change="handleSelect"
        @search-change="searchChange"
        @open="handleOpen"
    >
        <template #option="{ option }">
            <div 
                v-if="inn"
                class="multiselect-inn"
                :class="option.color_status"
            >
                <div class="multiselect-inn__inner">
                    <div class="multiselect-inn__left">
                        <div class="multiselect-inn__inn">
                            ИНН <span>{{ option.inn }}</span>
                        </div>
                        <div class="multiselect-inn__kpp">
                            КПП <span>{{ option.kpp }}</span>
                        </div>
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
                    <div class="multiselect-bet__name">
                        {{ option.label }}
                    </div>
                    <div class="multiselect-bet__price">
                        {{ $helpers.toPrice(option.price || 0, { sign: option.currency_detail, pointer: ',' }) }}
                    </div>
                </div>
            </div>
            <div 
                v-else-if="tender"
                class="multiselect-tender"
            >
                <div class="multiselect-tender__inner">
                    <div class="multiselect-tender__number">
                        №{{ option.value }}
                    </div>
                    <div class="multiselect-tender__name">
                        {{ option.label }}
                    </div>
                </div>
            </div>
            <div 
                v-else-if="lot"
                class="multiselect-lot"
            >
                <div class="multiselect-lot__inner">
                    <div class="multiselect-lot__number">
                        №{{ option.num }}
                    </div>
                    <div class="multiselect-lot__name">
                        {{ option.label }}
                    </div>
                </div>
            </div>
            <div 
                v-else-if="country"
                class="multiselect-country"
            >
                <div class="multiselect-country__inner">
                    <span class="multiselect-country__code">
                        {{ option.label }}
                    </span>
                    <span class="multiselect-country__name">
                        {{ option.country }}
                    </span>
                </div>
            </div>
            <div 
                v-else-if="person"
                class="multiselect-person"
            >
                <div class="multiselect-person__inner">
                    <span class="multiselect-person__name">
                        {{ option.label }}
                    </span>
                    <span :class="['icon m--perms-tenders', !option.disabled && 'm--on']" />
                </div>
            </div>
        </template>
    </Multiselect>
</template>

<script setup>
    import { defineProps, ref, onUpdated, computed } from 'vue';
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
    const canDeselect = mode === 'single' ? false : true;
    const canClear = props.context.attrs.canClear;
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
    const filterResults = props.context.attrs.filterResults || false;
    const infinite = props.context.attrs.infinite || false;
    const limit = props.context.attrs.limit || null;
    const delay = props.context.attrs.delay || null;
    const inn = props.context.attrs.inn !== undefined ? true : false;
    const bet = props.context.attrs.bet !== undefined ? true : false;
    const tender = props.context.attrs.tender !== undefined ? true : false;
    const lot = props.context.attrs.lot !== undefined ? true : false;
    const country = props.context.attrs.country !== undefined ? true : false;
    const person = props.context.attrs.person !== undefined ? true : false;
    // let vModelValue = reactive({})

    // const optionsComuted = computed(() => {
    //     return options;
    // });

    function handleOpen(select$) {
        console.log('handleOpen')
        if (props.context.attrs.bet) {
            multiselect.value.clear();
            multiselect.value.refreshOptions();
        }
        /*
        if (select$.noOptions) {
            select$.resolveOptions();
        }
        */
        /*
        if (props.context.attrs.lot) {
            multiselect._value.clear();
            multiselect._value.refreshOptions();
        }
        */
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
        console.log('onUpdated');
        let v = props.context._value;
        if (v && v.fromParent) {
            multiselect.value.clear()

            if (searchable)
                multiselect.value.clearSearch()

            if (Array.isArray(v.value) && !v.value.length) {
                if (v.value) {
                    multiselect.value.select(v.value)
                }
                return;
            }
            if (v.value) {
                multiselect.value.select(v.value)
            }
        }
    })
</script>