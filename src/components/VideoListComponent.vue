<template>
  <div id="videolist">
    <VideoComponent v-for="(v,k) in videos" :type="v.type" :key="k" :index="k" :title="v.title"
                    :script="v.script" :keywords="v.keywords" :src="v.embedCode" :autoplay="v.autoplay"
                    :thumbnail="v.thumbnail"></VideoComponent>
    <div v-if="!videos.length">No result for your search</div>
    <div v-if="videos.length" class="empty"></div>
    <div v-if="videos.length" class="empty"></div>
    <div v-if="videos.length" class="empty"></div>
    <div v-if="videos.length" class="empty"></div>
    <div v-if="videos.length" class="empty"></div>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent"
import {useState} from "@/store/store"
import fullTextSearch from '@/lib/FullTextSearch'

export default {
  name: 'VideoListComponent',
  components: {VideoComponent},
  props: {},
  data() {
    return {
      lastVideos: this.state.videos.slice(0, 20)
    }
  },
  computed: {
    videos() {
      if (this.state.search.length < 3) {
        if (!this.state.search.length) {
          return this.setLastVideos(this.state.videos.slice(0, 20))
        }
        return this.lastVideos
      }
      const videos = fullTextSearch.search(this.state.search, this.state.videos).slice(0, 30)
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
    return {state: useState()}
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variable";
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