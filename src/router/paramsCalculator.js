export function paramsCalculator(actualQuery, newParameters = {}) {

    const allParams = {...actualQuery, ...newParameters}

    let toDelete = []

    for (let prop in allParams) {
        // eslint-disable-next-line no-prototype-builtins
        if (!allParams.hasOwnProperty(prop)) {
            continue
        }
        if (!allParams[prop].length) {
            toDelete.push(prop)
        }
    }

    for (let prop of toDelete) {
        delete allParams[prop]
    }

    return allParams
}