export function arrayCombine(keys, values) {
    return keys.reduce(function(obj, key, index) {
        obj[key] = values[index]
        return obj
    }, {})
}

export function objectJoin(object, joinSymbol = ': ', separator = ', ') {
    return Object.keys(object).reduce(function(obj, key, index) {
        obj += (index > 0 ? separator : '') + key + joinSymbol + Object.values(object)[index]
        return obj
    }, '')
}

