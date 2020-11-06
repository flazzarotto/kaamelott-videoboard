const slugify = require('slugify')

function lcSlug(text) {
    return slugify(text.replace(/,/g,'-')).toLowerCase().replace(/-+/g, '-')
}

export default {
    search(searchText, objectSet) {
        objectSet.map(x => x.score = 0)
        // eslint-disable-next-line no-prototype-builtins
        const workingSet = objectSet.filter(x => x.hasOwnProperty('keywords'))
        if (!workingSet.length) {
            throw new Error('Object set must have a `keyword` field to be searched in.')
        }
        searchText = lcSlug(searchText)
        workingSet.map(x => {
            x.keywords = lcSlug(x.keywords)
        })
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
        const result = workingSet.filter(x => x.score > 0)
        result.sort((a, b) => {
            return b.score - a.score
        })
        return result
    }
}

