<template>
    <!-- tags -->
    <div />
</template>
<script>
    import { useMeta } from 'vue-meta';
    import { helpers } from '@/utils/helpers';

    export default {
        name: 'MetaTags',
        props: {
            data: {
                type: Object,
                default() { return {}; }
            },
            route: {
                type: Object,
                default() { return {}; }
            },
        },
        setup (props) {
            console.log('MetaTags', props);
            const $helpers = helpers;
            useMeta({
                title: $helpers.createTitle(props.data, props.route),
                description: $helpers.createDescription(props.data, props.route),
                keywords: $helpers.createKeywords(props.data, props.route),
            });
        },
    }
</script>