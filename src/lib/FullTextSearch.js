const slugify = require('slugify')

export function lcSlug(text) {
    return slugify(text.replace(/,/g,'-')).toLowerCase().replace(/-+/g, '-')
}

export default {
    search(searchText, objectSet, episodes) {
        // eslint-disable-next-line no-prototype-builtins
        let workingSet = objectSet.filter(x => x.hasOwnProperty('keywords'))
        if (!workingSet.length) {
            throw new Error('Object set must have a `keyword` field to be searched in.')
        }

        workingSet = workingSet.map(
            x => {
                return {...x, score: 0}
            }
        )

        workingSet.map(x => x.score = (searchText.length > 3) ? 0 : 1)

        if (searchText.length > 3) {
            searchText = lcSlug(searchText)
            const maxScore = searchText.length
            workingSet.map(
                x => {
                    if (('-' + x.keywords + '-').indexOf(searchText) > -1) {
                        x.score += maxScore
                    }
                }
            )
            for (let word of searchText.split(/-/g)) {
                workingSet.map(
                    x => {
                        if (x.score >= maxScore) {
                            return
                        }
                        x.score += (x.keywords.indexOf(word) > -1)
                    }
                )
            }
        }

        if (episodes.length) {
            workingSet.map(
                x => {
                    if (!x.score) {
                        return
                    }
                    x.score *= (x.episode.indexOf(episodes) === 0)
                }
            )
        }
        const result = workingSet.filter(x => x.score > 0)
        result.sort((a, b) => {
            return b.score - a.score
        })
        return result
    }
}

