import { createApp } from 'vue'
import App from '@/App.vue'
import {storeSymbol, createStore} from "@/store/store"
import router from '@/router/router'
import guards from '@/router/guards'

const app = createApp(App)
app.provide(storeSymbol, createStore())
app.use(router)

router.beforeEach(guards.beforeEach({router}))

app.mount('#app')
