let lineNumber = 1

export class Video {
    #_id
    #_citation
    #_name
    #_url
    #_duration
    #_thumbnailUrl
    #_autoplay
    #_partOfEpisode
    #_people
    #_tags

    /**
     *
     * @param id
     * @param description
     * @param name
     * @param url
     * @param duration
     * @param thumbnailUrl
     * @param autoplay
     * @param partOfEpisode
     * @param people
     * @param tags
     */
    constructor(
        {
            id, citation, name, url, duration = 0, thumbnailUrl = null, autoplay = null,
            partOfEpisode, people, tags = ''
        }) {
        this.#_id = id || this.error(id, 'Missing id for video ', arguments)
        this.#_citation = citation || this.error(citation,`Missing script for video ${id}`)
        this.#_name = name || this.error(name, `Missing title for video ${id}`)
        this.#_url = url || this.error(url, `Missing url for video ${id}`)
        this.#_duration = duration || this.error(duration, `Missing duration for video ${id}`,
            null,'warn')
        this.#_thumbnailUrl = thumbnailUrl
        this.#_autoplay = autoplay
        this.#_partOfEpisode = partOfEpisode || this.error(partOfEpisode, `Missing episode for video ${id}`)
        this.#_people = (people instanceof Array) ? people : this.error(people,`Missing characters for video ${id}`)
        this.#_tags = tags
    }

    error(field, message, additionalInfo = null, level = 'error') {
        console[console[level] ? level :  'error'](message)
        if (additionalInfo) {
            console.info(additionalInfo)
        }
        return field
    }

    get partOfEpisode() {
        return this.#_partOfEpisode
    }

    /**
     * Expose data for use in VideoManager
     * @returns {{characters: *, keywords: *, link: *, index: number, episode: *, id: *, title: *, script: *}}
     */
    expose() {
        return {
            index: lineNumber++,
            id: this.#_id,
            link: this.#_url,
            title: this.#_name,
            keywords: this.#_tags,
            characters: this.#_people,
            script: this.#_citation,
            episode: this.#_partOfEpisode
        }
    }
}