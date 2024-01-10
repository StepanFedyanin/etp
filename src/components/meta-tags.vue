<template>
    <!-- tags -->
    <div/>
</template>
<script>
import { useMeta } from 'quasar';
import { helpers } from '@/utils/helpers';
import { selfPath } from '@/settings';

export default {
    name: 'MetaTags',
    setup (props) {
        //console.log('MetaTags', props);
        const $helpers = helpers;
        useMeta(() => {
            return {
                title: $helpers.createTitle(props.data, props.route),
                meta: {
                    description: { name: 'description', content: $helpers.createDescription(props.data, props.route) },
                    keywords: { name: 'keywords', content: $helpers.createKeywords(props.data, props.route) },
                    ogSiteName:  { property: 'og:site_name', content: 'Бизнес-платформа TUGAN' },
                    ogUrl:  { property: 'og:url', content: `${selfPath}${props.route.href}` },
                    ogTitle:  { property: 'og:title', content: $helpers.createTitle(props.data, props.route, false) },
                    ogDescription:  { property: 'og:description', content: $helpers.createDescription(props.data, props.route, false) },
                    ogImage:  { property: 'og:image', content: '/tugan-snippet.png' },
                    ogImageWidth:  { property: 'og:image.width', content: '1000' },
                    ogImageHeight:  { property: 'og:image.height', content: '400' },
                },
                htmlAttr: {
                    prefix: 'og: http://ogp.me/ns#'
                    // lang: 'ru'
                },
            }
        });
    },
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
}
</script>