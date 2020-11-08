export function arrayCombine(array1, array2) {
    return array1.reduce(function(obj, key, index) {
        obj[key] = array2[index]
        return obj
    }, {})
}

export function objectJoin(object, joinSymbol = ': ', separator = ', ') {
    return Object.keys(object).reduce(function(obj, key, index) {
        obj += (index > 0 ? separator : '') + key + joinSymbol + Object.values(object)[index]
        return obj
    }, '')
}

