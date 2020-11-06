const FullTextSearch = require('full-text-search')

export default {
    search(video, text) {
        const fts = new FullTextSearch({
            ignore_case: true,
            index_amount: 8,
            minimum_chars: 3
        })

        fts.add(video)

        return fts.search(text)
    }
}

