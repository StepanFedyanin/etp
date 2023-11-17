import { boot } from 'quasar/wrappers'
import { vMaska } from 'maska'
import { vOnClickOutside } from '@vueuse/components'
import VueYandexMetrika from '@/modules/vue3-yandex-metrika'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
    if (process.env.SERVER) {
        const _vOnClickOutside = {
            mounted (el, binding) {
                el.id = binding.value
            },
            getSSRProps (binding) {
                return {
                    id: binding.value
                }
            }
        };
        app.directive('OnClickOutside', _vOnClickOutside);
        const _vMaska = {
            mounted (el, binding) {
                el.id = binding.value
            },
            getSSRProps (binding) {
                return {
                    id: binding.value
                }
            }
        };
        app.directive('Maska', _vMaska);
    }

    if (process.env.CLIENT) {
        app.directive('OnClickOutside', vOnClickOutside);
        app.directive('Maska', vMaska);
        console.warn('YandexMetrika', process.env.NODE_ENV);
        app.use(VueYandexMetrika, {
            id: 90339048,
            router: router,
            env: process.env.NODE_ENV,
            debug: true, // false,
            options: {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            }
        });
    }
})
