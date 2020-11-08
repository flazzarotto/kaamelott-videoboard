import sha1 from 'sha1'

const slugify = require('slugify')

/**
 * Normalize string using slugify, lowercase and removing unnecessary hyphens
 * @param text
 * @returns {string}
 */
export function lcSlug(text) {
    return slugify(('-' + text + '-')
        .replace(/,/g, '-'))
        .toLowerCase()
        .replace(/-+/g, '-')
}

const initialWorkingSet = {}

export default {
    search(searchText, objectSet, requiredFields = {}, searchField = 'keywords') {
        const hash = sha1(JSON.stringify(objectSet))
        if (!initialWorkingSet[hash]) {
            initialWorkingSet[hash] = []
            // make a first copy of objectSet with items having keywords field
            objectSet.map((x, i) => {
                if (x[searchField] && x[searchField].length) {
                    initialWorkingSet[hash][i] = {...x, keywords: x[searchField]}
                }
            })
            if (!initialWorkingSet[hash].length) {
                delete initialWorkingSet[hash]
                throw new Error('Object set must have a `keyword` field to be searched in.')
            }
        }

        // set score=0 (or 1 if no search) and normalize keywords
        let workingSet = initialWorkingSet[hash].map(x => {
                x.score = (searchText.length >= 3) ? 0 : 1
                x.keywords = lcSlug(x.keywords)
                return x
            }
        )

        if (searchText.length >= 3) {
            searchText = lcSlug(searchText)
            // set score to arbitrary "max" score if exact match
            const maxScore = searchText.length
            let keywordsLengthMean = 0
            workingSet.map(
                x => {
                    keywordsLengthMean += x.keywords.length
                    if (x.keywords.indexOf(searchText) > -1) {
                        x.score += maxScore
                    }
                }
            )

            keywordsLengthMean /= workingSet.length

            for (let word of searchText.split(/-/g)) {
                workingSet.map(
                    x => {
                        // no need to deep search if score already maxed
                        if (x.score >= maxScore) {
                            return
                        }

                        let done = false
                        let scoreModifier = 1
                        do {
                            let found = x.keywords.indexOf(word) > -1
                            x.score +=
                                scoreModifier
                                // negative score if not found
                                * (found ? 1 : (-2 / word.length))
                                //
                                * (
                                    // word pertinence according to search length and document corpus
                                    word.length
                                    / (searchText.length * (x.keywords.length / keywordsLengthMean))
                                )
                            // allow to search partial word longer than 4 if not found
                            if (!found && word.length > 4) {
                                word = word.substr(0, word.length - 1)
                                // partial search will give lesser score
                                scoreModifier *= (1 - 1 / word.length)
                                continue
                            }
                            done = true
                        }
                        while (!done)
                    }
                )
            }
        }

        for (let field in requiredFields) {
            const value = requiredFields[field]
            if (field.length) {
                workingSet.map(
                    x => {
                        if (!x.score) {
                            return
                        }
                        if (!x[field]) {
                            x.score = 0
                            return
                        }

                        x.score *= (x[field].reduce(function (prevVal, currVal, idx) {
                                return idx === 0 ? currVal : prevVal + ', ' + currVal;
                            }, ''
                        ).indexOf(value) >= 0)
                    }
                )
            }
        }

        const result = workingSet.filter(x => x.score > 0.1)
        result.sort((a, b) => {
            return b.score - a.score
        })
        return result
    }
}

