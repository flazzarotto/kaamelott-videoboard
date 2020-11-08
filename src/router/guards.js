import {createStore} from "@/store/store";
import {paramsCalculator} from "@/router/paramsCalculator";

const store = createStore()

export default {
    beforeEach: ({router}) => function (to, from, next) {

        switch (to.name) {
            case 'home':
                switch (from.name) {
                    case 'home':
                        break
                    default:
                        // if hitting 'Home' button from another page, try to get search parameters back, and redirect
                        if (Object.values(store.state.search).join('')
                            .replace(/\s+/, '').length) {
                            router.replace({
                                name: 'home', query: paramsCalculator(store.state.search)
                            })
                            store.changeSearch({})
                            return
                        }
                        break
                }
                store.changeSearch({...to.query})
                break
        }

        next()
    }
}
