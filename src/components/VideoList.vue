<template>
  <div id="videolist">
    <Video v-for="(v,k) in videos" :key="k" v-bind="v" :window-scroll-top="scrollTop"
           :window-height="windowHeight"></Video>
    <div v-if="!videos.length">{{ trans('video-list:no-result') }}</div>
    <div v-for="k in (new Array(5))" :key="k" class="empty"></div>
  </div>
  <a id="top" @click="scrollToTop" :class="{show: scrollTop > 0.7*windowHeight}">⏫</a>
</template>

<script>
import Video from "@/components/Video"
import {useStore} from "@/store/store"
import fullTextSearch from '@/lib/FullTextSearch'
import {trans} from "@/lib/functions/trans";

export default {
  name: 'VideoListComponent',
  components: {Video},
  props: {
    maxVideo: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      scrollTop: -1,
      windowHeight: -1,
    }
  },
  computed: {
    // return video list according to search params
    videos() {
      const search = this.store.state.search.fullText
      const findEpisodes = this.store.state.search.findEpisodes

      return fullTextSearch.search(
          search,
          this.store.state.videos,
          {episode: findEpisodes},
          this.store.state.search.order, this.store.state.search.sort)//.slice(0, this.maxVideo)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)
    this.handleScroll()
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  },
  methods: {
    trans,
    handleScroll() {
      this.scrollTop = document.documentElement.scrollTop
      this.windowHeight = window.innerHeight
    },
    scrollToTop() {
      window.scroll(0,0)
    }
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";

#videolist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (min-width: 715px) {
    justify-content: space-between;
  }
}

#top {
  color: black;
  font-size: 3rem;
  font-weight: bold;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 15;
  width: 3rem; height: 3rem;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;

  transition: opacity .3s ease;

  &.show {
    opacity: .7;
    pointer-events: auto;
    &:hover,&:active,&:focus {
      opacity: 1;
      transition: opacity 0s ease;
    }
  }
}

.empty {
  @include video-component;
  opacity: 0;
}
</style>