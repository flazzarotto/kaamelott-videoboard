<template>
  <section id="main">
    <SearchBar></SearchBar>
    <section id="videos">
      <VideoListComponent></VideoListComponent>
    </section>
    <router-link :to="{name: 'about'}" class="link">
      {{ trans('app_about_title') }}
    </router-link>
  </section>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import VideoListComponent from "@/components/VideoList";
import {trans} from "@/lib/functions/trans";
import {useStore} from "@/store/store";

export default {
  name: "Main",
  components: {VideoListComponent, SearchBar},
  methods: {
    trans
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style scoped>

</style>