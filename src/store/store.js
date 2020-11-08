import { reactive, provide, inject, readonly } from 'vue'
import VideoManager from './videos'
import translations_fr from '@/translations/fr.json'

const _translations = {fr: translations_fr}

const defaultSearch = {findEpisodes: '', fullText: ''}

const available_languages = Object.keys(_translations)

const state = reactive({
    videos: VideoManager.videos,
    episodes: VideoManager.episodes,
    currentVideo: null,
    search: defaultSearch,
    _translations,
    available_languages,
    lang: available_languages[0],
    get translations() {
        return this._translations[this.lang]
    }
})

const mutations = {
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

export const storeSymbol = Symbol('store')
export const createStore = () => {
    return { ...mutations, state: readonly(state) };
}

export const useStore = () => inject(storeSymbol)
export const provideStore = () => provide(
    storeSymbol,
    createStore()
)
