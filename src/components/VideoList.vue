<template>
  <div id="videolist">
    <Video v-for="(v,k) in videos" :key="k" v-bind="v"></Video>
    <div v-if="!videos.length">{{ trans('video-list:no-result') }}</div>
    <div v-for="k in (new Array(5))" :key="k" class="empty"></div>
  </div>
</template>

<script>
import Video from "@/components/Video"
import {useStore} from "@/store/store"
import fullTextSearch from '@/lib/FullTextSearch'
import {trans} from "@/lib/functions/trans";

export default {
  name: 'VideoListComponent',
  components: {Video},
  props: {
    maxVideo: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {

    }
  },
  computed: {
    // return video list according to search params
    videos() {
      const search = this.store.state.search.fullText
      const findEpisodes = this.store.state.search.findEpisodes

      return fullTextSearch.search(
          search,
          this.store.state.videos,
          {episode: findEpisodes},
      this.store.state.search.order, this.store.state.search.sort).slice(0, this.maxVideo)
    }
  },
  methods: {
    trans,
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";

#videolist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.empty {
  @include video-component;
  opacity: 0;
}
</style>