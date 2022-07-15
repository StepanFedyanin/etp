<template>
    <div class="app__main">
        <!-- <Breadcrumbs /> -->
        <div class="cabinet">
            <div class="container">
                <div class="organization-edit">
                    <h1 class="organization-edit__title h1">
                        Профиль организации
                    </h1>
                    <h2 class="organization-edit__subtitle h2">
                        {{ organization ? organization.name : "" }}
                    </h2>
                    <OrganizationEdit
                        v-if="organization"
                        :organization="organization"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Breadcrumbs from '@/components/app-breadcrumbs';
    import OrganizationEdit from '@/components/organization-edit.vue';
    import { user as api } from "@/services";

    export default {
        components: {
            // Breadcrumbs,
            OrganizationEdit
        },
        data() {
            return {
                profile: undefined,
                organization: undefined,
                item: [],
            }
        },
        created() {
            api.getMyProfile().then(res => {
                this.profile = res;
                if (res.organization && res.organization.id) {
                    this.organization = res.organization;
                    console.log(res.organization);
                }
            }).catch(err => {
                console.error(err);
            });
        },
        methods: {
        }
    }
</script>