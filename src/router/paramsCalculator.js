/**
 * Recalculates params and remove empty ones
 * @param actualQuery
 * @param newParameters
 * @returns {*}
 */
export function paramsCalculator(actualQuery, newParameters = {}) {

    const allParams = {...actualQuery, ...newParameters}

    let toDelete = []

    for (let prop in allParams) {
        if (!allParams[prop].length) {
            toDelete.push(prop)
        }
    }

    for (let prop of toDelete) {
        delete allParams[prop]
    }

    return allParams
}