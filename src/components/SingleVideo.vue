<template>
  <section>
    <router-link :to="{name: 'home'}" class="link">Retour</router-link>
    <VideoComponent v-bind="video" :directLink="true"></VideoComponent>
  </section>
</template>

<script>
import Video from "@/components/Video";
import {useStore} from "@/store/store";

export default {
  name: "SingleVideo",
  components: {VideoComponent: Video},
  computed: {
    video() {
      const videos = this.store.state.videos.filter(x => x.id === this.$route.params.video)
      if (videos.length) {
        return videos[0]
      }
      console.error(`No video found with id '${this.$route.params.video}'`)
      return []
    }
  },
  methods: {
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/variable";

section {
  text-align: left;

  & > a + * {
    margin: auto;
    text-align: center;
  }

}
</style>
