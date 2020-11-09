import {VideoLoader} from "@/store/VideoLoader/VideoLoader";

export const kvbLoader = new VideoLoader(
    function(parameters, cbFn) {
        parameters
        cbFn
        // TODO fetch
        // TODO new Video() + cbFn
        throw new Error('VideoLoader not implemented yet')
    },
    function (backendUrl) {
        return !!backendUrl && backendUrl.match(/\/api$/)
    }
)

