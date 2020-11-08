import {objectJoin} from "@/lib/functions/arrayCombine";

/**
 * Use as method in components / object with this.store provided (components or others)
 * @param id
 * @param params
 * @returns string
 */
export function trans(id, params = {}) {
    if (this.store.state.translations[id]) {
        // returns translation if found
        return this.store.state.translations[id].replace(/%([^%]+)%/ig, (matches) => {
            // replace parameters with values
            let param = params[matches.replace(/(^%)|(%$)/g, '')]
            if (param !== undefined) {
                return param
            }
            console.warn(`Missing translation param ${param} for ${id}`)
            return `%param%`
        })
    }

    const warn = `{{ ${[id, Object.keys(params).length
        ? '%' + objectJoin(params, ':', '%') + '%'
        : ''].join(' ')} }}`

    console.warn(`Missing translation for ${warn}`)

    return warn
}
