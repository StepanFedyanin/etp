<template>
    <div class="cabinet contragents">
        <div class="container">
            <div class="contragents__title h1">
                Мои контрагенты
            </div>
            <div class="contragents__block">
                <div class="contragents__header">
                    <div class="contragents__header-cell m--name">
                        Название
                    </div>
                    <div class="contragents__header-cell m--activity">
                        Основной вид деятельности
                    </div>
                    <div class="contragents__header-cell m--customer">
                        Заказчик
                    </div>
                    <div class="contragents__header-cell m--member">
                        Участник
                    </div>
                </div>
                <div class="contragents__list">
                    <div 
                        v-for="contragent in contragents"
                        :key="`customer-${contragent.id}`"
                        class="contragents__item"
                        @click="onClickContragent(contragent.id)"
                    >
                        <div class="contragents__item-cell m--name">
                            {{ contragent.name }}
                            <div class="m--name-city">
                                {{ contragent.city }}
                            </div>
                        </div>
                        <div class="contragents__item-cell m--activity">
                            {{ contragent.principal_activity }}
                        </div>
                        <div class="contragents__item-cell m--customer">
                            {{ contragent.customer }}
                        </div>
                        <div class="contragents__item-cell m--member">
                            {{ contragent.member }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { user as api } from "@/services";

    export default {
        components: {
        },
        data() {
            return {
                contragents: [],
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        created() {
            api.getOrganizations(this.id).then(res => {
                this.contragents = res.results;
                console.log(res.results);
                // this.$store.dispatch('setUser', res);
                // if(this.organization) {
                //     this.organization = res.organization;
                // }
            }).catch(err => {
                console.error(err);
            })
        },
        methods: {
            onClickContragent(id) {
                this.$router.push({ name: 'contragent', params: { id: id } });
            }
        }
    };
</script>
