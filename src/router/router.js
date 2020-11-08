import routes from "@/router/routes";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const configuration = {
    webHashHistory: '/#',
    webHistory: '',
}

const confUsed = 'webHashHistory'

export const routePrefixer = configuration[confUsed]

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

export default router