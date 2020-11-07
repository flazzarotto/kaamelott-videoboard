import { reactive, provide, inject, readonly } from 'vue'
import VideoManager from './videos'

const state = reactive({
    videos: VideoManager.videos,
    episodes: VideoManager.episodes,
    currentVideo: null,
    findEpisodes: '',
    search: '',
})

const mutations = {
    changeSearch(newSearch) {
        state.search = newSearch
        this.setCurrentVideo(null)
    },
    changeEpisodes(book, tome, episode) {
        state.findEpisodes = [book, tome, episode].map(x => x ?? '').join('')
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
