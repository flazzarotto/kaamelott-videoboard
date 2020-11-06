import VideoManager from "@/lib/VideoManager"
import csvData from '@/data/videos.csv'

const embedParameters = {
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}

const characters = {
    bohort: 'Bohort',
    karadoc: 'Karadoc',
    perceval: 'Perceval',
    leodagan: 'Léodagan',
    arthur: 'Arthur'
}

const header = csvData[0]

for (let lineNumber = 1; lineNumber < csvData.length; lineNumber++) {
    const line = csvData[lineNumber]
    const data = Object.assign(...header.map((k, i) => ({[k]: line[i]})))

    data.characters = data.characters.replace(/\s+/,'').split(',').filter(x => characters[x])

    VideoManager.addEpisode(data.episode)

    VideoManager
    .addVideo(
        data.link,
        data.title,
        data.keywords,
        data.characters.map(x => characters[x]),
        data.script,
        data.episode,
        embedParameters
    )
}

export default VideoManager