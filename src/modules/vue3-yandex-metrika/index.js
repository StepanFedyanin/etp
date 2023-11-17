/* istanbul ignore file */
import { updateConfig, checkConfig, loadScript, createMetrika, createMetrikaError, startTracking } from './helpers'

export default {
    install (app, options = {}) {
        updateConfig(options) // Merge options and default config

        checkConfig() // Check if all required options are presented

        loadScript(() => { // Load Metrika script
            const metrika = createMetrika(app) // Create Metrika
            startTracking(metrika) // Start autotracking
            app.metrika = metrika
            app.config.globalProperties.$metrika = metrika
        }, 
        () => { // LoadError Metrika script
            const metrika = createMetrikaError(app) // Create MetrikaError
            startTracking(metrika) // Start autotracking
            app.metrika = metrika
            app.config.globalProperties.$metrika = metrika
        }, 
        options.scriptSrc)
    }
}
