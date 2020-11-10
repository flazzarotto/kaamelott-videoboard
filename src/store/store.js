import { reactive, provide, inject, readonly } from 'vue'
import translations from '@/translations'
import {next, getVideoData} from "@/store/videos";

const defaultSearch = {findEpisodes: '', fullText: '', order: 'score', sort: 'asc'}

const available_languages = Object.keys(translations)

const state = reactive({
    videos: [],
    episodes: [],
    currentVideo: null,
    search: defaultSearch,
    available_languages,
    lang: available_languages[0],
    get translations() {
        return translations[this.lang]
    }
})

const mutations = {
    updateFromVideoManager(VideoManager) {
        state.videos = VideoManager.videos
        state.episodes = VideoManager.episodes
    },
    changeSearch(search) {
        search = {...defaultSearch, ...search}

        state.search = search
        this.setCurrentVideo(null)
    },
    setCurrentVideo(video) {
        state.currentVideo = video
    },
    setLang(lang) {
        if (state.available_languages.indexOf(lang) < 0) {
            console.error('Language '+lang+' not supported')
            return
        }
        state.lang = lang
    }
}

// Symbol used by Vue for the store
export const storeSymbol = Symbol('store')
export const createStore = () => {
    return { ...mutations, state: readonly(state) };
}

getVideoData(next(mutations.updateFromVideoManager))

// use in component to access store
export const useStore = () => inject(storeSymbol)
// not used
export const provideStore = () => provide(
    storeSymbol,
    createStore()
)
