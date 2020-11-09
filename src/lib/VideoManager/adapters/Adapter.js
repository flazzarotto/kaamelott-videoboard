/**
 * VideoLoader definition for managing video links
 */
export class Adapter {
    /**
     * @param type adapter type
     * @param matchingFunction
     * @param getEmbedUriFunction
     * @param getThumbnailFunction
     */
    constructor(type, matchingFunction, getEmbedUriFunction, getThumbnailFunction) {
        this.type = type
        this.matches = matchingFunction
        this.getEmbedUri = getEmbedUriFunction
        this.getThumbnail = getThumbnailFunction
    }

    /**
     * Stub function
     * @param parsedUri
     * @returns {boolean}
     */
    matches(parsedUri) { return parsedUri.domain === false}

    /**
     * Stub function
     * @param parsedUri
     * @returns {string}
     */
    getEmbedUri(parsedUri, obj = {}){ obj; parsedUri; return parsedUri.file }

    /**
     * Stub function
     * @param data
     * @returns {string}
     */
    getThumbnail(data) {return data}
}