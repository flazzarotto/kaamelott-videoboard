import VideoManager from "@/lib/VideoManager/VideoManager"
import csvData from '@/data/videos.csv'
import {youtubeLong, youtubeShort} from "@/lib/VideoManager/adapters/youtube"
import sha1 from 'sha1'
// characters stored in json so that we can use small names in CSV
import characters from '@/data/characters.json'

// register adapters (youtube) to manage video sources
VideoManager.registerAdapters(youtubeLong, youtubeShort)

// custom embed parameters
const embedParameters = {
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}

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

    // adding episode in episode list if not already in
    VideoManager.addEpisode(data.episode)

    // adding video
    VideoManager.addVideo(
        lineNumber,
        sha1(data.link),
        data.link,
        data.title,
        data.keywords,
        data.characters.map(x => characters[x]),
        data.script,
        data.episode,
        embedParameters
    )

    // random sorting for home page
    VideoManager.videos = VideoManager.videos.sort((a,b) => b.id.localeCompare(a.id))
}

export default VideoManager