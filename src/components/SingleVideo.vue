<template>
  <section>
    <router-link :to="{name: 'home'}" class="link">{{ trans('link_back') }}</router-link>
    <VideoComponent v-bind="video" :directLink="true"></VideoComponent>
  </section>
  <router-link :to="{name: 'about'}" class="link">
    {{ trans('app_about_title') }}
  </router-link>
</template>

<script>
import Video from "@/components/Video"
import {useStore} from "@/store/store"
import {trans} from "@/lib/functions/trans"

export default {
  name: "SingleVideo",
  components: {VideoComponent: Video},
  computed: {
    // find correct video
    video() {
      const videos = this.store.state.videos.filter(x => x.hash === this.$route.params.video)
      if (videos.length) {
        return videos[0]
      }
      console.error(`No video found with id '${this.$route.params.video}'`)
      return []
    }
  },
  methods: {
    trans
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

.link {
  margin-top: 60px;
}
</style>
