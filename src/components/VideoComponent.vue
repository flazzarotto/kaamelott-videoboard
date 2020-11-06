<template>
  <div class="video-component" v-show="isVisible">
    <div class="video-container" :style="computedStyle">
      <video v-if="type === 'local'" :src="src"/>
      <div v-else v-html="src"></div>
    </div>
    <div class="text">
      <h2>{{ title }}</h2>
      <p v-if="script.length">{{ script }}</p>
      <p :style="{display: 'none'}">{{ keywords.replace(/,/g, ', ') }}</p>
      <div class="code">{{ type === 'local' ? `` : src }}</div>
    </div>
  </div>
</template>

<script>
import {useState} from "@/store/store"
import FullTextSearch from '@/lib/FullTextSearch'

export default {
  name: "VideoComponent",
  props: {
    index: {
      type: Number
    },
    title: {
      type: String,
      default: ''
    },
    script: {
      type: String,
      default: ''
    },
    keywords: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'local'
    },
    src: String,
    style: Object,
    ratio: {
      type: Number,
      default: 0.5625
    }
  },
  data() {
    return {
      basicStyle: {
        position: 'relative',
        height: '0',
        width: '100%',
        'padding-bottom': (this.ratio * 100) + '%'
      },
      visibility: null
    }
  },
  computed: {
    computedStyle() {
      return {...this.basicStyle, ...this.style}
    },
    // TODO we should do this on the videos object.......
    isVisible() {
      this.setVisibility(this.state.search)
      return this.visibility
    }
  },
  methods: {
    // TODO we should do this on the videos object.......
    setVisibility(search) {
      this.visibility = (search.length >= 3)
          // TODO we should do this on the videos object.......
          ? (FullTextSearch.search(this.keywords.split(','), search).length > 0)
          : ((this.visibility === null || search.length === 0) ? (this.index < 10) : this.visibility)
    }
  },
  setup() {
    return {state: useState()}
  }
}
</script>

<style lang="scss">
.video-component {
  margin: 0 7.5px 15px;
  width: 320px;
  background: rgba(0, 0, 0, .1);
  padding-bottom: 7.5px;

  h2 {
    font-size: 1.1rem;
  }

  .text {
    word-wrap: break-word;
    max-width: 80%;
    margin: auto;
  }
}

.video-container {
  video, iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: none;
  }
}

.code {
  word-break: break-all;
  border: 1px solid #888;
  user-select: all;
  -moz-user-select: all;
  font-family: monospace;
  font-size: 0.8rem;
}
</style>