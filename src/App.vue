<template>
  <h1>
    <img :src="Perceval" alt="Perceval" />
    {{ title }}
  </h1>
  <SearchBar></SearchBar>
  <section id="videos">
    <VideoListComponent></VideoListComponent>
  </section>
</template>

<script>
import VideoListComponent from "@/components/VideoListComponent"
import SearchBar from "@/components/SearchBar"
import Perceval from '@/assets/perceval.png'

export default {
  name: 'App',
  components: {
    SearchBar,
    VideoListComponent,
  },
  data() {
    return {
      title: 'Kaamelott Videoboard',
      Perceval
    }
  }
}
</script>

<style lang="scss">
:root, body {
  padding: 0;
  margin: 0;
}

h1, h1 img {
  vertical-align: middle;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px auto 0;
  padding: 0 15px;
}

#videos {
  margin: auto;
}
</style>
