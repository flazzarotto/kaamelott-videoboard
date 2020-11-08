/**
 * Parses LxTxExx strings as array [Lx, Tx, Exx]
 * @param episode
 * @returns {string[]}
 */
export const episodeParser = (episode) => {
    episode = /^(L[0-9])(T[0-9])?(E[0-9]+)?$/g.exec(episode || '')
    if (!episode) {
        return [null,null,null]
    }
    return episode.slice(1).map(x => x ?? null)
}