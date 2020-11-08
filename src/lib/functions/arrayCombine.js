/**
 * Combines two arrays (same length) to give an object
 * @param keys
 * @param values
 * @returns {*}
 */
export function arrayCombine(keys, values) {
    return keys.reduce(function(obj, key, index) {
        obj[key] = values[index]
        return obj
    }, {})
}

/**
 * Reduce an object as a string using key:value join symbol and entry separator
 * @param object
 * @param keyValueJoinSymbol
 * @param entrySeparator
 * @returns {string}
 */
export function objectJoin(object, keyValueJoinSymbol = ': ', entrySeparator = ', ') {
    const values = Object.values(object)
    return Object.keys(object).reduce(function(obj, key, index) {
        obj += (index > 0 ? entrySeparator : '') + key + keyValueJoinSymbol + values[index]
        return obj
    }, '')
}

