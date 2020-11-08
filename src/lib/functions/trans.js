import {objectJoin} from "@/lib/functions/arrayCombine";

export function trans(id, params = {}) {
    return (
        this.store.state.translations[id] ?
        this.store.state.translations[id].replace(/%([^%]+)%/ig, (matches) => {
            return params[matches.replace(/(^%)|(%$)/g,'')]
        })
        : `{{ ${[id, Object.keys(params).length
            ? '%'+objectJoin(params,':','%')+'%' 
            : ''].join(' ')} }}`
    )
}