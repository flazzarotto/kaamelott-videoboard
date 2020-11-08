/**
 * Extracts meta from route
 * @param route
 */
export function getSeoDataFromRoute(route) {
    const metas = {}
    for (let meta in route.metas) {
        if (route.metas[meta] instanceof Function) {
            metas[meta] = route.metas[meta]()
        }
    }
    setSeoData(metas)
}

/**
 * Set metas for current page
 * @param title
 * @param description
 * @param og_title
 * @param og_description
 * @param og_image
 * @param og_video
 */
function setSeoData({
                        title = null,
                        'meta.description': description = '',
                        'meta.og:title': og_title = title,
                        'meta.og:description': og_description = description,
                        'meta.og:image': og_image = null,
                        'meta.og:video': og_video = null,
                    }) {
    const metas = {
        title,
        'meta.description': description,
        'meta.og:title': og_title,
        'meta.og:description': og_description,
        'meta.og:image': og_image,
        'meta.og:video': og_video,
    }

    for (let metaName in metas) {
        let metaValue = metas[metaName]
        const type = metaName.split('.')
        let tagName = metaName

        let tag, name = null

        // meta tag
        if (type[0] === 'meta') {
            tagName = 'meta'
            name = type[1]
            tag = document.querySelector('head > ' + tagName + '[name="' + name + '"]')
        } else { // other tag - <title>
            tag = document.querySelector('head > ' + tagName)
        }

        // remove tag if null
        if (!metaValue) {
            if (tag) {
                tag.parentElement.removeChild(tag)
            }
            continue
        }

        metaValue = metaValue.replace(/\s+/g, ' ')

        // create and add tag to <head> if not present
        if (!tag) {
            tag = document.createElement(tagName)
            if (name) {
                tag.setAttribute('name', name)
            }
            document.querySelector('head').append(tag)
        }

        // set meta tag content
        if (name) {
            tag.setAttribute('content', metaValue)
            continue
        }
        // set other tag content
        tag.textContent = metaValue
    }
}