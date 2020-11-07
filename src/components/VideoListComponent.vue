<template>
  <div id="videolist">
    <VideoComponent v-for="(v,k) in videos" :key="k" v-bind="v"></VideoComponent>
    <div v-if="!videos.length">No result for your search</div>
    <div v-for="k in (new Array(5))" :key="k" class="empty"></div>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent"
import {useStore} from "@/store/store"
import fullTextSearch from '@/lib/FullTextSearch'

export default {
  name: 'VideoListComponent',
  components: {VideoComponent},
  props: {
    maxVideo: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      lastVideos: this.store.state.videos.slice(0, 20)
    }
  },
  computed: {
    videos() {
      if (this.store.state.search.length < 3 && !this.store.state.findEpisodes) {
        if (!this.store.state.search.length && !this.store.state.findEpisodes) {
          return this.setLastVideos(this.store.state.videos.slice(0, this.maxVideo))
        }
        return this.lastVideos
      }
      const videos = fullTextSearch.search(
          this.store.state.search,
          this.store.state.videos,
          this.store.state.findEpisodes).slice(0, this.maxVideo)
      return this.setLastVideos(videos)
    }
  },
  methods: {
    setLastVideos(videos) {
      this.lastVideos = videos
      return this.lastVideos
    }
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