import Main from "@/components/Main"
import SingleVideo from "@/components/SingleVideo"
import About from "@/components/About";

export const home = {
    name: 'home',
    path: '',
    component: Main
}

export const videoDetailRoute = {
    name: 'videoDetail',
    path: '/video/:video',
    component: SingleVideo,
}

export const aboutRoute = {
    name: 'about',
    path: '/about',
    component: About,
}

export default [
    home,
    videoDetailRoute,
    aboutRoute
]
