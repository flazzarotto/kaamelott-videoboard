import { createApp } from 'vue'
import App from './App.vue'
import {storeSymbol, createStore} from "@/store/store"

const app = createApp(App)
app.provide(storeSymbol, createStore())
app.mount('#app')
