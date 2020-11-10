import {lcSlug} from "@/lib/FullTextSearch";
import {Adapter} from "@/lib/VideoManager/adapters/Adapter";
import sha1 from 'sha1'

// query string parser
const qs = require('qs')

/**
 *
 * @type {object}
 */
const VideoManager = {
    /**
     * registered adapters
     */
    supportedTypes: {},
    /**
     * list of videos
     */
    videos: [],
    /**
     * list of episodes
     */
    episodes: {},
    /**
     * Loader used to fetch videos and other data
     * @type VideoLoader
     */
    videoLoader: null,
    /**
     * Register video adapter(s) to manage video sources
     * @param adapters list of adapters
     */
    registerAdapters(...adapters) {
        for (let adapter of adapters) {
            if (!(adapter instanceof Adapter)) {
                continue
            }
            this.supportedTypes[adapter.type] = adapter
        }
    },
    /**
     * Return video list in JSON
     * @returns {string}
     */
    toJSON() {
        return JSON.stringify(this.videos)
    },
    /**
     * @param index
     * @param video {Video}
     * @param embedParameters list of html parameters for iframe
     * @return Object video representation
     */
    addVideo(index, video, embedParameters = {
        frameborder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    }) {
        let {link, keywords, episode, title, characters, script, id} = video.expose()
        // remove trailing spaces
        link = link.replace(/(\s+)|(\s+$)/g, '')
        // default embed params
        const params = {width: 720, height: 405, allowfullscreen: true, ...embedParameters}
        // join all text in keywords field for full text search
        keywords = [episode, keywords, title, characters.join(','), script].join(',')
            .replace(/[ ,;.]+/g, ',').replace(/,$/, '')
        // get episode number
        let episodeNumber = episode.split(' ', 1).join('')
        let videoObject = {
            index,
            id,
            hash: sha1(link),
            link,
            ...this.getEmbedCode(link, params),
            title,
            keywords: lcSlug(keywords),
            script,
            characters,
            episode: episodeNumber,
            episodeTitle: episode.replace(new RegExp('^' + episodeNumber + '\\s+'), '')
        }
        this.videos.push(videoObject)
        return video
    },
    /**
     * Add episode to episode list if not present
     * @param episodeStr
     */
    addEpisode(episodeStr) {
        const nested = episodeStr.match(/^(L[0-9])(T[0-9])(E[0-9]+)\s(.*)$/)
        let upper = this.episodes
        for (let i = 1; i < nested.length; i++) {
            if (!upper[nested[i]]) {
                upper[nested[i]] = {}
            }
            if (i === 3) {
                upper[nested[3]] = nested[4]
                break
            }
            upper = upper[nested[i]]
        }
    },
    /**
     * Return parsedUri
     * @param string
     * @returns {{subdomains: *, path: *, file: *, domain: string, query: QueryString.ParsedQs, match: *, hash: QueryString.ParsedQs}}
     */
    uriMatcher(string) {
        const matches = string.match(/^https?:\/\/((?:[a-z0-9\-_]+\.)+)([a-z0-9\-_]+)\/((?:[a-z0-9\-_%.]+\/)?)([a-z0-9\-_%.]+\/?)((?:\?.+)?)((?:#.*)?)$/i)

        matches[1] = matches[1].replace(/\.$/, '')

        return {
            match: matches[0],
            subdomains: ((array) => array.slice(0, array.length - 1))(matches[1].split('.')),
            domain: [((array) => array[array.length - 1])(matches[1].split('.')), matches[2]].join('.'),
            path: matches[3],
            file: matches[4],
            query: qs.parse(matches[5].replace(/^\?/, '')),
            hash: qs.parse(matches[6].replace(/^#/, ''))
        }
    },
    /*
    isIFrame(string) {
        string
        // todo return iframe
        return false
    },
    isLocalFile(string) {
        string
        // todo return local file
        return false
    },
    */
    /**
     * Returns embed code from string (uri)
     * @param string
     * @param parameters
     * @returns {{thumbnail: string, embedCode: string, type: boolean, autoplay: string}}
     */
    getEmbedCode(string,
                 parameters = {}) {
        let parsed = this.uriMatcher(string)
        /*
        if (!parsed) {
            // TODO check local file

            if (false === this.isLocalFile(parsed.file)) {
                throw new Error(string + ' should be either link to video either iframe')
            }

            if (false === this.isIFrame(string)) {
                throw new Error(string + ' should be either link to video either iframe')
            }

        }
        */
        let embedUri = false
        let currentType = false
        let parsedObj = {}

        // check video type using registered adapters
        for (let typeName in this.supportedTypes) {
            let type = this.supportedTypes[typeName]
            if (type.matches(parsed)) {
                embedUri = type.getEmbedUri(parsed, parsedObj)
                currentType = typeName
                break
            }
        }

        if (embedUri === false) {
            throw new Error('URI not supported or type not correctly implemented')
        }

        const autoplayProps = [], props = []

        props.push('src="' + embedUri + '"')
        autoplayProps.push('src="' + parsedObj.autoplay + '"')

        for (let prop in parameters) {
            props.push(prop + '="' + parameters[prop] + '"')
            autoplayProps.push(prop + '="' + parameters[prop] + '"')
        }

        return {
            type: currentType,
            embedCode: `<iframe ${props.join(' ')}></iframe>`,
            autoplay: `<iframe ${autoplayProps.join(' ')}></iframe>`,
            thumbnail: this.supportedTypes[currentType].getThumbnail(parsedObj.videoId)
        }
    }
}

export default VideoManager