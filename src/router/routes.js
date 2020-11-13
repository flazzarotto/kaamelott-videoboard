import Main from "@/components/Main"
import SingleVideo from "@/components/SingleVideo"
import About from "@/components/About";
import Perceval from '@/assets/perceval.png'
import {trans} from "@/lib/functions/trans";
import {episodeParser} from "@/lib/functions/episodeParser";

// Routes must be named (unique) and have a component
// metas must be inside a `metas` getter and be named like '[tagName](.[name])' and must be arrow functions
// fetch function have access to store and current route (this.store and this.currentRoute - do not use these properties)

const home = {
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

const videoDetailRoute = {
    name: 'videoDetail',
    path: '/video/:video',
    component: SingleVideo,
    async fetch() {
        while (!this.store.state.loaded) {
            await (async () => new Promise(resolve => setTimeout(resolve, 100)))()
        }
        this.data = this.store.state.videos.filter(x => x.hash === this.currentRoute.params.video)[0] ?? null
    },
    get metas () {
        return {
            title: () => {
                const video = this.data
                let episode = episodeParser(video.episode)
                    .map(x => this.trans('episode:' + x.replace(/[0-9]+/, ''),
                        {number: x.replace(/[LTE]/, '')}))
                episode = [episode.join(' '), video.episodeTitle].join(' : ')

                return this.trans('app_video_title', {
                    episode, title: video.title
                })
            },
            'meta.description': () => this.data.script,
            'meta.og:image': () => this.data.thumbnail,
            'meta.og:video': () => this.data.link,
        }
    }
}

const aboutRoute = {
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