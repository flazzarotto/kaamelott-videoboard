const qs = require('qs')

const TypeFactory = function (matches, getEmbedUri, getThumbnail) {
    return {
        matches,
        getEmbedUri,
        getThumbnail
    }
}


const youtubeEmbed = 'https://www.youtube.com/embed/'
const youtubeThumbnail = function() {
    return function(videoId) {
        return `http://img.youtube.com/vi/${videoId}/default.jpg`
    }
}

const VideoManager = {
    supportedTypes: {
        youtube: TypeFactory(
            function (parsedUri) {
                return parsedUri.domain === 'youtube.com'
            },
            function (parsedUri, obj = {}) {
                obj.videoId = parsedUri.query['v']
                return youtubeEmbed + obj.videoId
            },
            youtubeThumbnail()
            ),
        "youtu.be": TypeFactory(
            function (parsedUri) {
                return parsedUri.domain === 'youtu.be'
            },
            function (parsedUri, obj = {}) {
                obj.videoId = parsedUri.file
                return youtubeEmbed + obj.videoId
            },
            youtubeThumbnail()),
    },
    videos: [],
    toJSON() {
        return JSON.stringify(this.videos)
    },
    /**
     * @param link link to the video
     * @param title title of the video
     * @param keywords list of comma-separated keywords (title and script will already be in the keywords)
     * @param script script of the video
     * @param embedParameters list of html parameters for iframe
     */
    addVideo(link, title, keywords = '', characters = [], script = '', embedParameters = {}) {
        const params = {width: 720, height: 405, allowfullscreen: true,...embedParameters}
        keywords = [keywords, title, characters.join(','), script].join(',').replace(/[ ,;.]+/g, ',').replace(/,$/,'')
        this.videos.push(
            {...this.getEmbedCode(link, params), title, keywords, script, characters}
        )
        return this
    },
    uriMatcher(string) {
        const matches = string.match(/^https?:\/\/((?:[a-z0-9\-_]+\.)+)([a-z0-9\-_]+)\/((?:[a-z0-9\-_%.]+\/)?)([a-z0-9\-_%.]+\/?)((?:\?.+)?)((?:#.*)?)$/i)

        console.info({string, matches})

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
    getEmbedCode(string,
                 parameters = {}) {
        let parsed = this.uriMatcher(string)
        if (!parsed) {
            // TODO check local file
            if (false === this.isLocalFile(parsed.file)) {
                throw new Error(string + ' should be either link to video either iframe')
            }

            if (false === this.isIFrame(string)) {
                throw new Error(string + ' should be either link to video either iframe')
            }

        }

        let embedUri = false
        let currentType = false
        let parsedObj = {}

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


        const props = []
        parameters.src = embedUri

        for (let prop in parameters) {
            props.push(prop + '="' + parameters[prop] + '"')
        }

        return {
            type: currentType,
            embedCode: `<iframe ${props.join(' ')}></iframe>`,
            thumbnail: this.supportedTypes[currentType].getThumbnail(parsedObj.videoId)
        }
    }
}

export default VideoManager