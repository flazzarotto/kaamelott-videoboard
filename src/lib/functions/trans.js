import {objectJoin} from "@/lib/functions/arrayCombine";

/**
 * Use as method in components / object with this.store provided (components or others)
 * @param id
 * @param params
 * @returns string
 */
export function trans(id, params = {}) {
        if (this.store.state.translations[id]) {
            return this.store.state.translations[id].replace(/%([^%]+)%/ig, (matches) => {
                return params[matches.replace(/(^%)|(%$)/g, '')]
            })
        }

        const warn = `{{ ${[id, Object.keys(params).length
            ? '%'+objectJoin(params,':','%')+'%'
            : ''].join(' ')} }}`

        console.warn(`Missing translation for ${warn}`)

        return warn
}
