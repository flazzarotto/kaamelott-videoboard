import VideoManager from "@/lib/VideoManager"
import csvData from '@/data/videos.csv'
import {hashCode} from "@/lib/functions/hashCode";

const embedParameters = {
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}

const characters = {
    bohort: 'Bohort',
    karadoc: 'Karadoc',
    perceval: 'Perceval',
    leodagan: 'Léodagan',
    arthur: 'Arthur',
    seli: 'Dame Séli',
    guenievre: 'Guenièvre',
    breccan: 'Breccan',
    grudu: 'Grüdü',
    demetra: 'Demetra',
    lancelot: 'Lancelot du Lac',
    attila: 'Attila le Hun',
    damedulac: 'La Dame du Lac',
    barde: 'Buzit le barde'
}

const header = csvData[0]

for (let lineNumber = 1; lineNumber < csvData.length; lineNumber++) {
    const line = csvData[lineNumber]

    const data = Object.assign(...header.map((k, i) => ({[k]: line[i]})))

    if (!data.characters) {
        continue
    }

    const chars = data.characters.replace(/\s+/g, '').split(',')

    data.characters = chars.filter(x => characters[x])

    if (data.characters.length !== chars.length) {
        console.error(`At least one unknown character in group '${chars.join(', ')}' for video '${data.title}'.`)
    }

    VideoManager.addEpisode(data.episode)

    VideoManager.addVideo(
        btoa(''+hashCode(data.link)),
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