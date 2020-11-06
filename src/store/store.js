import { reactive, provide, inject } from 'vue'
import VideoManager from './videos'

const state = {
    videos: VideoManager.videos,
    episodes: VideoManager.episodes,
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
