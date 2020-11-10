import VideoManager from "@/lib/VideoManager/VideoManager"
import {youtubeLong, youtubeShort} from "@/lib/VideoManager/adapters/youtube"
import {kvbLoader} from "@/store/VideoLoader/adapters/kaamelott-videoboard-backend";
import {localLoader} from "@/store/VideoLoader/adapters/local";

const videoLoaders = [
    kvbLoader,
    localLoader
]

// register adapters (youtube) to manage video sources
VideoManager.registerAdapters(youtubeLong, youtubeShort)

export const next = (callback) => (videoLoader) => {
    // videoLoader used to load videos
    VideoManager.loader = videoLoader
    // random sorting for home page
    VideoManager.videos = VideoManager.videos.sort(() => .5 - Math.random())

    callback(VideoManager)
}

export const getVideoData = function(next) {
    // generic fetch function with callback
    const fetchFunction = (videoLoader, params = {}, fallback) => {
        if (!videoLoader.isLocal()) {
            videoLoader.fetch(params, next).catch(e => {
                fallback(e)
            })
        }
        else {
            videoLoader.fetch(params, next)
        }
    }
    // check compliant loaders
    for (let videoLoader of videoLoaders) {
        if (!videoLoader.match(process.env.VUE_APP_BACKEND_URL)) {
            if (videoLoader.isLocal()) {
                videoLoader.match()
            } else {
                continue
            }
        }

        // use first compliant loader
        fetchFunction(videoLoader, {}, (e) => {
            console.warn(e.message)
            // fallback if backend down or no available loader
            if (!videoLoader.isLocal()) {
                try {
                    localLoader.match()
                    fetchFunction(localLoader)
                } catch (e) {
                    console.error(e.message)
                }
            }
        })
        break
    }
}

export default VideoManager