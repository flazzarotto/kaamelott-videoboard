import {Adapter} from "@/lib/VideoManager/adapters/Adapter"

const youtubeEmbed = 'https://www.youtube.com/embed/'

const youtubeAutoplay = function (embed) {
    return embed + (embed => (embed.indexOf('?') > -1) ? '&' : '?')(embed) + 'autoplay=1'
}

const youtubeThumbnail = function () {
    return function (videoId) {
        return `https://img.youtube.com/vi/${videoId}/0.jpg`
    }
}

/**
 * Youtube long url
 * @type {Adapter}
 */
export const youtubeLong = new Adapter(
    'youtube',
    function (parsedUri) {
        return parsedUri.domain === 'youtube.com'
    },
    function (parsedUri, obj = {}) {
        obj.videoId = parsedUri.query['v']
        const embed = youtubeEmbed + obj.videoId
        obj.autoplay = youtubeAutoplay(embed)
        return embed
    },
    youtubeThumbnail()
)

/**
 * Youtube short url
 * @type {Adapter}
 */
export const youtubeShort = new Adapter(
    'youtu.be',
    function (parsedUri) {
        return parsedUri.domain === 'youtu.be'
    },
    function (parsedUri, obj = {}) {
        obj.videoId = parsedUri.file
        const embed = youtubeEmbed + obj.videoId
        obj.autoplay = youtubeAutoplay(embed)
        return embed
    },
    youtubeThumbnail()
)
