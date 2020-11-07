const ucFirst = function(string) {
    return string.charAt(0).toUpperCase() + string.substring(1)
}
const ucWords = function(string) {
    return string.split(/ /g).map(ucFirst).join(' ')
}

export {ucFirst, ucWords}