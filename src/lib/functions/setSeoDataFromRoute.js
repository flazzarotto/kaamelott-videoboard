export function getSeoDataFromRoute(route) {
    const metas = {}
    for (let meta in route.metas) {
        if (route.metas[meta] instanceof Function) {
            metas[meta] = route.metas[meta]()
        }
    }
    setSeoData(metas)
}

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

        if (type[0] === 'meta') {
            tagName = 'meta'
            name = type[1]
            tag = document.querySelector(tagName + '[name="' + name + '"]')
        } else {
            tag = document.querySelector(tagName)
        }

        if (!metaValue) {
            if (tag) {
                tag.parentElement.removeChild(tag)
            }
            continue
        }

        metaValue = metaValue.replace(/\s+/g, ' ')

        if (!tag) {
            tag = document.createElement(tagName)
            if (name) {
                tag.setAttribute('name', name)
            }
            document.querySelector('head').append(tag)
        }

        if (name) {
            tag.setAttribute('content', metaValue)
            continue
        }
        tag.textContent = metaValue
    }
}