import {VideoLoader, VideoLoaderTypes} from "@/store/VideoLoader/VideoLoader"
import csvData from "@/data/videos.csv"
import characters from "@/data/characters.json"
import {Video} from "@/lib/VideoManager/Video"

export const localLoader = new VideoLoader(
    function(parameters, next) {
        // stub
        parameters
        // CSV header
        const header = csvData[0]

        // reading the CSV line by line
        for (let lineNumber = 1; lineNumber < csvData.length; lineNumber++) {
            const line = csvData[lineNumber]

            // creating key:value using header
            const data = Object.assign(...header.map((k, i) => ({[k]: line[i]})))

            // characters are needed
            if (!data.characters) {
                continue
            }

            const chars = data.characters.replace(/\s+/g, '').split(',')

            data.characters = chars.filter(x => characters[x])

            if (data.characters.length !== chars.length) {
                console.error(`At least one unknown character in group '${chars.join(', ')}' for video '${data.title}'.`)
            }

            const video = new Video(
                {
                    id: lineNumber,
                    citation: data.script,
                    name: data.title,
                    url: data.link,
                    partOfEpisode: data.episode,
                    characters: data.characters.map(x => characters[x]),
                    tags: data.keywords
                }
            )
            // adding episode in episode list if not already in
            this.videoManager.addEpisode(video.partOfEpisode)

            // adding video
            this.videoManager.addVideo(
                lineNumber,
                video
            )
        }

        next(this)
    },
    function (backendUrl) {
        return !backendUrl
    },
    VideoLoaderTypes.local
)

