// static videoLoader types
import VideoManager from "@/lib/VideoManager/VideoManager";

export const VideoLoaderTypes = {
    get local() {
        return 'local'
    },
    get remote() {
        return 'remote'
    }
}

// abstract video loader
export class VideoLoader {

    #_type
    #_url
    #_fetch
    #_match
    videoManager

    // type: local / remote
    get type() {
        return this.#_type
    }

    // endpoint or null
    get url() {
        return this.#_url
    }

    /**
     * Checks if loader is local
     * @returns {boolean} true if local loader, false otherwise
     */
    isLocal() {
        return this.type === VideoLoaderTypes.local
    }

    /**
     * @param fetchMethod {function(parameters: {}, callback: {function(video: Video, index: Number)}, next: {function} )}
     * @param matchMethod {function({string?} url)}
     * @param type {string} VideoLoaderType.local or VideoLoaderType.remote
     */
    constructor(fetchMethod = () => {
    }, matchMethod = () => {
        return false
    }, type = VideoLoaderTypes.remote) {
        this.#_fetch = fetchMethod
        this.#_match = matchMethod
        this.#_type = type
        this.videoManager = VideoManager
    }

    /**
     * Create video object sent to cbFn
     * @param parameters
     * @param next {function(VideoLoader)}
     * @returns {*}
     */
    fetch(parameters, next) {
        if (!this.url && this.#_type !== VideoLoaderTypes.local) {
            console.error('No URL provided')
        }
        return this.#_fetch(parameters, next)
    }

    /**
     * Returns true if adapter match backend type
     * @param backendUrl
     * @returns {boolean}
     */
    match(backendUrl) {
        if (this.#_match(backendUrl)) {
            this.#_url = backendUrl
            return true
        }
        return false
    }
}
