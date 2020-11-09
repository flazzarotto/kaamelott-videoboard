<template>
  <section id="main">
    <SearchBar></SearchBar>
    <section id="videos">
      <VideoList></VideoList>
    </section>
    <router-link :to="{name: 'about'}" class="link">
      {{ trans('app_about_title') }}
    </router-link>
  </section>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import VideoList from "@/components/VideoList";
import {trans} from "@/lib/functions/trans";
import {useStore} from "@/store/store";

export default {
  name: "Main",
  components: {VideoList, SearchBar},
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