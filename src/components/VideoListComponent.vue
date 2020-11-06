<template>
  <div id="videolist">
    <VideoComponent v-for="(v,k) in videos" :type="v.type" :key="k" :index="k" :title="v.title"
                    :script="v.script" :keywords="v.keywords" :src="v.embedCode"></VideoComponent>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent"
import {useState} from "@/store/store"

export default {
  name: 'VideoListComponent',
  components: {VideoComponent},
  props: {},
  data() {
    return {
      videos: this.state.videos
    }
  },
  computed: {},
  methods: {},
  setup() {
    return {state: useState()}
  }
}
</script>

<style lang="scss" scoped>
  #videolist {
    display: flex;
    flex-wrap: wrap;
  }
</style>