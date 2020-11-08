import routes from "@/router/routes";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

/**
 * Used to get routePrefix
 */
const configuration = {
    webHashHistory: '/#',
    webHistory: '',
}

const confUsed = 'webHashHistory'

const routePrefix = configuration[confUsed]

let history
switch (confUsed) {
    case 'webHashHistory':
        history = createWebHashHistory()
        break
    case 'webHistory':
        history = createWebHistory()
        break
}

const router = createRouter({
    history,
    routes
})

/**
 * Calculates absolute or relative url according to route and provided params
 * @param route
 * @param params
 * @param absolute
 * @returns {boolean|*} false if route is not found
 */
export function routeCalculator(route, params, absolute = true) {
    route = routes.filter(r => r.name === route)[0]
    if (!route) {
        console.warn(`Route ${route} not found`)
        return false
    }
    return (absolute ? (window.location.origin + routePrefix) : '') + (() => {
        let path = route.path
        for (let param in params) {
            let value = params[param]
            path = path.replace(':'+param, value)
        }
        return path
    })().replace(/:[^:/]+/,'')
}

export default router