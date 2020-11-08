import Main from "@/components/Main"
import SingleVideo from "@/components/SingleVideo"
import About from "@/components/About";
import Perceval from '@/assets/perceval.png'
import {trans} from "@/lib/functions/trans";

// Routes must be named (unique) and have a component

export const home = {
    name: 'home',
    path: '',
    component: Main,
    get metas() {
        return {
            title: () => this.trans('app_title'),
            'meta.description': () => this.trans('app_description'),
            'meta.og:image': () => Perceval.toString(),
            'meta.og:video': null,
        }
    }
}

export const videoDetailRoute = {
    name: 'videoDetail',
    path: '/video/:video',
    component: SingleVideo,
    fetch() {
        if (!this.data) {
            this.data = this.store.state.videos.filter(x => x.id === this.currentRoute.params.video)[0] ?? []
        }
        return this.data
    },
    get metas() {
        return {
            title: () => {
                const video = this.fetch()
                let episode = /^(L[0-9])(T[0-9])(E[0-9]+)$/g.exec(video.episode)
                episode = episode.slice(1).map(x => this.trans('episode:'+x.replace(/[0-9]+/,''),
                    {number: x.replace(/[LTE]/,'')}))
                episode = [episode.join(' '), video.episodeTitle].join(' : ')

                return this.trans('app_video_title', {
                    episode, title: video.title
                })
            },
            'meta.description': () => this.fetch().script,
            'meta.og:image': () => this.fetch().thumbnail,
            'meta.og:video': () => this.fetch().link,
        }
    }
}

export const aboutRoute = {
    name: 'about',
    path: '/about',
    component: About,
    get metas() {
        return {
            title: () => this.trans('app_about_title'),
            'meta.description': () => this.trans('app_about_description')
        }
    }
}

const routes = [
    home,
    videoDetailRoute,
    aboutRoute
]

for (let route of routes) {
    if (route.metas) {
        route.store = null
        route.currentRoute = null
        route.trans = null
        route.inject = function ({store, currentRoute}) {
            this.store = store
            this.currentRoute = currentRoute
            this.trans = trans
        }
    }
}

export default routes