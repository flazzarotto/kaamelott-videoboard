export const VideoLoaderTypes = {
    get local() {
        return 'local'
    },
    get remote() {
        return 'remote'
    }
}

export class VideoLoader {

    #_type
    #_url
    #_fetch
    #_match

    get type() {
        return this.#_type
    }

    get url() {
        return this.#_url
    }

    isLocal() {
        return this.type === VideoLoaderTypes.local
    }

    constructor(fetchMethod = () => {
    }, matchMethod = () => {
        return false
    }, type = VideoLoaderTypes.remote) {
        this.#_fetch = fetchMethod
        this.#_match = matchMethod
        this.#_type = type
    }

    /**
     * Create video object sent to cbFn
     * @param parameters
     * @param cbFn
     * @returns {*}
     */
    fetch(parameters, cbFn) {
        if (!this.url && this.#_type !== VideoLoaderTypes.local) {
            console.error('No URL provided')
        }
        return this.#_fetch(parameters, cbFn)
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
