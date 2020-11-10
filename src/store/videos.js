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

export const getVideoData = async function(next) {
    // generic fetch function with callback
    const fetchFunction = async (videoLoader, params = {}) => {
        await videoLoader.fetch(params, next)
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
        try {
            // use first compliant loader
            await fetchFunction(videoLoader)
        } catch (e) {
            console.warn(e.message)
            // fallback if backend down or no available loader
            if (!videoLoader.isLocal()) {
                try {
                    localLoader.match()
                    await fetchFunction(localLoader)
                } catch (e) {
                    console.error(e.message)
                }
            }
        }
        break
    }
}

export default VideoManager