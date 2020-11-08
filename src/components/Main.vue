<template>
  <section id="main">
    <SearchBar></SearchBar>
    <section id="videos">
      <VideoListComponent></VideoListComponent>
    </section>
    <router-link :to="{name: 'about'}" class="link">À propos de Kaamelott Videoboard</router-link>
  </section>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import VideoListComponent from "@/components/VideoList";

export default {
  name: "Main",
  components: {VideoListComponent, SearchBar}
}
</script>

<style scoped>

</style>