<template>
  <h1>{{ title }}</h1>
  <SearchBar></SearchBar>
  <section id="videos">
    <VideoListComponent></VideoListComponent>
  </section>
</template>

<script>
import VideoListComponent from "@/components/VideoListComponent";
import SearchBar from "@/components/SearchBar";

export default {
  name: 'App',
  components: {
    SearchBar,
    VideoListComponent,
  },
  data() {
    return {
      title: 'Kaamelott Videoboard'
    }
  }
}
</script>

<style lang="scss">
:root, body {
  padding: 0;
  margin: 0;
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
}

#videos {
  margin: auto;
}
</style>
