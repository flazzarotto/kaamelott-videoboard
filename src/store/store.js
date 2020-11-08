import { reactive, provide, inject, readonly } from 'vue'
import VideoManager from './videos'

const defaultSearch = {findEpisodes: '', fullText: ''}

const state = reactive({
    videos: VideoManager.videos,
    episodes: VideoManager.episodes,
    currentVideo: null,
    search: defaultSearch,
})

const mutations = {
    changeSearch(search) {
        search = {...defaultSearch, ...search}

        state.search = search
        this.setCurrentVideo(null)
    },
    setCurrentVideo(video) {
        state.currentVideo = video
    }
}

export const storeSymbol = Symbol('store')
export const createStore = () => {
    return { ...mutations, state: readonly(state) };
}

export const useStore = () => inject(storeSymbol)
export const provideStore = () => provide(
    storeSymbol,
    createStore()
)
