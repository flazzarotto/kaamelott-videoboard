import { createApp } from 'vue'
import App from './App.vue'
import {stateSymbol, createState} from "@/store/store"

const app = createApp(App)
app.provide(stateSymbol, createState())
app.mount('#app')
