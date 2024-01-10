<template>
    <div class="profile__notifications notifications">
        <template
            v-if="showLoaderSending"
        >
            <div class="notifications__loader loader">
                <div class="spinner" /> Загрузка данных
            </div>
        </template>
        <template
            v-else-if="settings"
        >
            <div 
                class="notifications__settings"
            >
                <div 
                    v-for="(group, index) in settings"
                    :key="`settings-group-${index}`"
                    class="notifications__settings-group"
                >
                    <h2 class="notifications__settings-group-name">
                        {{ group.name }}
                    </h2>
                    <div class="notifications__settings-group-block">
                        <div
                            v-for="template in group.templates" 
                            class="notifications__settings-item"
                            :key="`notifications-${template.id}`"
                        >
                            <div class="notifications__settings-item-param">
                                <FormKit
                                    v-model="template.user_email"
                                    type="checkbox"
                                    name="email"
                                    label="email"
                                    @change="onChangeSettingEmail(template.id)"
                                />
                            </div>
                            <div class="notifications__settings-item-param">
                                <FormKit
                                    v-model="template.user_push"
                                    type="checkbox"
                                    name="push"
                                    label="web"
                                    @change="onChangeSettingPush(template.id)"
                                />
                            </div>
                            <div class="notifications__settings-item-name">
                                {{ template.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="notifications__content content">
                <p>Выбранные уведомления будут приходить на почту: <strong class="m--color-green">{{ user.email }}</strong>. Изменить ее вы можете в настройках профиля.</p>
                <p>Также вы будете видеть выбранные уведомления в соответствующем разделе площадки.</p>
            </div>
        </template>
    </div>
</template>

<script>
    import { event as api } from "@/services";

    export default {
        components: {
        },
        data() {
            return {
                settings: null,
                showLoaderSending: false,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getNotificationsSettings();
        },
        methods: {
            getNotificationsSettings() {
                let params = {}
                this.showLoaderSending = true;
                api.getNotificationsSettings(params).then(res => {
                    this.settings = res;
                    //this.totalCount = res.count;
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            },
            onChangeSettingEmail(id) {
                let params = {
                    template: id
                };
                api.toggleNotificationsEmail(params).then(res => {
                    console.log(res);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            },
            onChangeSettingPush(id) {
                let params = {
                    template: id
                };
                api.toggleNotificationsPush(params).then(res => {
                    console.log(res);
                    this.showLoaderSending = false;
                }).catch(err => {
                    console.error(err);
                    this.showLoaderSending = false;
                })
            }
        }
    };
</script>