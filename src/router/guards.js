import {createStore} from "@/store/store"
import {paramsCalculator} from "@/router/paramsCalculator"
import routes from './routes'
import {getSeoDataFromRoute} from "@/lib/functions/setSeoDataFromRoute";

const store = createStore()


export default {
    // executed before each routing
    beforeEach: ({app, router}) => function (to, from, next) {

        const nextBeforeEach = function() {
            if (!app.isMounted) {
                app.mount('#app')
                app.isMounted = true
            }
            next()
        }

        switch (to.name) {
            case 'home':
                if (from.name instanceof String && from.name.length) {
                    switch (from.name) {
                        case 'home':
                            break
                        default:
                            // if hitting 'Home' button from another page, try to get search parameters back, and redirect
                            if (Object.values(store.state.search).join('')
                                .replace(/\s+/, '').length) {
                                nextBeforeEach()

                                router.replace({
                                    name: 'home', query: paramsCalculator(store.state.search)
                                })
                                store.changeSearch({})
                                return
                            }
                            break
                    }
                }
                store.changeSearch({...to.query})
                break
        }

        if (to.matched.length) {
            const route = routes.filter(r => r.name === to.matched[0].name)[0]
            if (route) {
                // store and router injection for SEO data fetching
                route.inject({store, currentRoute: to})
                // generate SEO meta tags
                getSeoDataFromRoute(route).then(nextBeforeEach)
            }
            else {
                nextBeforeEach()
            }
        } else {
            nextBeforeEach()
        }

    }
}
