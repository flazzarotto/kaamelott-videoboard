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


// custom embed parameters
const embedParameters = {
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}

const fetchFunction = (videoLoader, params = {}) => {
    videoLoader.fetch(params, (video, index) => {
        // adding episode in episode list if not already in
        VideoManager.addEpisode(video.partOfEpisode)

        // adding video
        VideoManager.addVideo(
            index,
            video,
            embedParameters
        )
    })
}

for (let videoLoader of videoLoaders) {
    if (!videoLoader.match(process.env.VUE_APP_BACKEND_URL)) {
        if (videoLoader.isLocal()) {
            videoLoader.match()
        }
        else {
            continue
        }
    }
    try {
        fetchFunction(videoLoader)
    }
    catch(e) {
        console.warn(e.message)
        // fallback if backend down
        if (!videoLoader.isLocal()) {
            try {
                fetchFunction(localLoader)
            }
            catch (e) {
                console.error(e.message)
            }
        }
    }
    break
}

// random sorting for home page
VideoManager.videos = VideoManager.videos.sort(() => .5 - Math.random())

export default VideoManager