<template>
  <!-- tags -->
  <div/>
</template>
<script>
import { useMeta } from 'quasar';
import { helpers } from '@/utils/helpers';

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
        },
        htmlAttr: {
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