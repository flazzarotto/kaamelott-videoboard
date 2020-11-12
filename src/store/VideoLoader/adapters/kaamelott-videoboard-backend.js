import {VideoLoader} from "@/store/VideoLoader/VideoLoader";
import {Video} from "@/lib/VideoManager/Video";

const memory = {
    set _add(value) {
        if (this[value] === undefined) {
            this[value] = false
        }
    },
    set _hydrate({value, data}) {
        this[value] = data
    }
}

const mapper = {
    'episodes': (episode) => {
        return [episode.episodeNumber, episode.name].join(' ')
    },
    'people': (people) => {
        return people.name
    },
    'tags': (tag) => {
        return tag.name
    },
}

async function getPage(baseUri, request, cbFn) {
    const json = await (await fetch(request)).json()

    const {'hydra:view': hydraView, 'hydra:member': members} = json

    if (hydraView && hydraView['hydra:next']) {
        let nextUri = baseUri + hydraView['hydra:next'].replace(/\/api/, '')
        cbFn(nextUri)
    }
    return members
}

async function getAll(baseUri, requestUri, requestInit) {
    let set = []
    requestUri = baseUri + requestUri
    do {
        // TODO fetch clips
        let request = new Request(requestUri, requestInit)
        requestUri = null
        set = set.concat(await getPage(baseUri, request, (nextUri) => {
            requestUri = nextUri
        }))
    } while (requestUri)
    return set
}

export const kvbLoader = new VideoLoader(
    async function (parameters, next) {
        parameters

        let requestInit = {
            headers: new Headers({
                'accept': 'application/ld+json'
            }),
            method: 'GET',
            // mode: "cors",
            cache: 'default'
        }

        for (let type in mapper) {
            // fetch relations
            const data = await getAll(this.url, '/' + type, requestInit)

            // map relations to @id
            data.map(piece => {
                if (piece instanceof Object) {
                    memory._hydrate = {value: piece['@id'], data: mapper[type](piece)}
                }
            })
        }

        let requestUri = this.url + '/clips'
        let index = 0

        do {
            let request = new Request(requestUri, requestInit)
            requestUri = null
            const clips = await getPage(this.url, request, (nextUri) => {
                requestUri = nextUri
            })


            // relation transformer
            clips.map(clip => {
                Object.keys(clip).map(prop => {
                    if (prop.match(/^@/)) {
                        return
                    }
                    const values = clip[prop] instanceof Array ? clip[prop] : [clip[prop]]
                    values.map((value, index) => {
                        if (!memory[value]) {
                            return
                        }
                        if (clip[prop] instanceof Array) {
                            clip[prop][index] = memory[value]
                        } else {
                            clip[prop] = memory[value]
                        }
                    })
                })
            })

            // TODO check why relation transformer not working anymore

            for (let clip of clips) {
                clip.tags = clip.tags.join(',')
                let video = new Video(clip)
                this.videoManager.addEpisode(video.partOfEpisode)
                this.videoManager.addVideo(++index, video)
            }

            next(this)
        } while (requestUri)
    },
    function (backendUrl) {
        return !!backendUrl && backendUrl.match(/\/api$/)
    }
)

