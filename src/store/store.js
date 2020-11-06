import { reactive, provide, inject } from 'vue'
import videos from './videos'

const state = {
    videos,
    search: '',
    changeSearch(newSearch) {
        this.search = newSearch
    }
}

export const stateSymbol = Symbol('state')
export const createState = () => reactive(state)

export const useState = () => inject(stateSymbol)
export const provideState = () => provide(
    stateSymbol,
    createState()
)
