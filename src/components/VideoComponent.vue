<template>
  <div class="video-component">
    <div class="video-container" :style="computedStyle" v-if="!clicked && thumbnail.length">
      <img :src="thumbnail" :alt="title" @click="clicked = true" />
    </div>
    <div class="video-container" :style="computedStyle" v-else>
      <video v-if="type === 'local'" :src="src"/>
      <div v-else v-html="src"></div>
    </div>
    <div class="text">
      <h2>{{ title }}</h2>
      <p class="script" v-if="script.length">{{ script }}</p>
      <p :style="{display: 'none'}">{{ keywords.replace(/,/g, ', ') }}</p>
      <div class="code">{{ type === 'local' ? `` : src }}</div>
    </div>
  </div>
</template>

<script>

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
    },
    thumbnail: {
      type: String,
      default: ''
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
      clicked: false
    }
  },
  computed: {
    computedStyle() {
      return {...this.basicStyle, ...this.style}
    },

  },
  methods: {

  }
}
</script>

<style lang="scss">
.video-component {
  margin: 0 7.5px 15px;
  width: 320px;
  background: rgba(0, 0, 0, .1);
  padding-bottom: 7.5px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.1rem;
  }

  .text {
    word-wrap: break-word;
    max-width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    .script {
      white-space: pre-line;
    }
  }
}

.video-container {
  overflow: hidden;
  video, iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: none;
  }
  img {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.code {
  word-break: break-all;
  border: 1px solid #888;
  user-select: all;
  -moz-user-select: all;
  font-family: monospace;
  font-size: 0.8rem;
  max-height: 75px;
  overflow-y: auto;
}
</style>