import VideoManager from "@/lib/VideoManager"

const embedParameters = {
    frameborder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}


const
    bohort = 'Bohort',
    karadoc = 'Karadoc',
    perceval = 'Perceval',
    leodagan = 'Léodagan',
    arthur = 'Arthur'

export default VideoManager.videos
VideoManager
    .addVideo(
        'https://youtu.be/3gP2GGt9mnc',
        'La femelle lièvre c\'est la haze',
        'L1T1E01 Heat',
        [bohort, karadoc],
        `- La femelle lièvre c'est la hase
        - Non moi j'connais qu'le cri`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=ItUmHXMgIzg',
        'Vous les voyez, vous ?',
        'L1T1E01 Heat',
        [arthur, perceval],
        `- Vous les voyez, vous ?
        - Non !
        - Ah ben tourné vers là-bas c'est sûr, moi non plus j'vois rien !`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=UfJJEfBLrM0',
        'Ils sont encore là ces cons',
        'L1T1E01 Heat',
        [leodagan],
        `Ils sont encore là ces cons !`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=j4wwOEUFflo',
        'Si ça se trouve',
        'L1T1E01 Heat',
        [arthur],
        `"Si ça se trouve" ! Alors pour nous sortir de là il va falloir un peu plus solide que du 
        si ça se trouve !`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=hfgauNbbzSM',
        'On pourrait balancer d\'la caillasse',
        'L1T1E01 Heat',
        [perceval],
        `On pourrait balancer d'la caillasse vers là-bas, comme ça ils s'disent qu'on y est et
        nous on part dans l'autre sens !`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=BeqUeG94Ctc',
        'Laissez tomber les combines à deux ronds',
        'L1T1E01 Heat',
        [arthur],
        `Allons, s'il vous plaît, laissez tomber les combines à 2 ronds`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=VopwQgMP-ms',
        'Merde s\'ils ont entendu mon plan c\'est foutu',
        'L1T1E01 Heat',
        [perceval, leodagan],
        `- Ils sont juste à côté ces cons-là...
        - Merde s'ils ont entendu mon plan c'est foutu !`,
        embedParameters
    )
    .addVideo(
        'https://www.youtube.com/watch?v=admWKfclMqw',
        'Animaux d\'la forêt !',
        'L1T1E01 Heat',
        [perceval],
        `Animaux de la forêt [imitations ratées de cris d'animaux]
        Attendez ! [autres imitations ratées de cris d'animaux]`,
        embedParameters
    )