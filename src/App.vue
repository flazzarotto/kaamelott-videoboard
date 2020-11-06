<template>
  <h1>
    <figure><img :src="Perceval" alt="Perceval"/></figure>
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
@import 'assets/scss/global';

h1 {
  &, figure {
    vertical-align: middle;
  }

  figure {
    overflow: hidden;
    border-radius: 100px;

    &:after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      box-shadow: -3px 3px 10px 3px black inset;
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  padding: 30px 15px 15px;
  background: linear-gradient(0deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)),
  url('assets/kaamelott.jpg') no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 100%;
  min-height: 100%;
}

#videos {
  margin: auto;
}
</style>
