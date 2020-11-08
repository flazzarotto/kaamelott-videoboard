<template>
  <div :class="{'video-component': 1, openInfos}">
    <div id="copy-links">
      <a @click="copyToClipboard(embedCode, {type: 'code'}, $event)"><i class="icon-code"></i></a>
<!--   TODO add internal link instead of external   -->
      <a @click="copyToClipboard(href, {type: 'lien'}, $event)" :href="href"><i class="icon-link"></i></a>
      <span :class="{'helper': 1, active: helper}">{{ helperText }}</span>
    </div>
    <div class="video-container" :style="computedStyle" v-if="!currentVideo && thumbnail.length">
      <img :src="thumbnail" :alt="title" @click="setCurrentVideo()"/>
      <div class="overlay"></div>
      <div class="click"></div>
    </div>
    <div class="video-container" :style="computedStyle" v-else>
      <video v-if="type === 'local'" :src="src"/>
      <div v-else v-html="autoplay"></div>
    </div>
    <div :class="{text: 1, open: openInfos}">
      <h2 class="info-toggler" @click="openInfos = !openInfos">
        <em :title="openInfos ? null : title">{{ title }}</em>
        <span :class="{openInfos}">▼</span>
      </h2>
      <div :class="{show: openInfos}">
        <p class="characters">{{ characters.join(', ') }}</p>
        <p class="script" v-if="script.length" v-html="scriptWithStageDirections"></p>
        <p v-show="false">{{ keywords.replace(/,/g, ', ') }}</p>
        <div class="code">{{ type === 'local' ? `` : src }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "@/store/store";
import {copyToClipboard} from "@/lib/functions/copyToClipboard";
import {ucFirst} from "@/lib/string";
import {videoDetailRoute} from "@/router/routes";
import {routePrefixer} from "@/router/router";
import {trans} from "@/lib/functions/trans";

export default {
  name: "VideoComponent",
  props: {
    directLink: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    characters: {
      type: Array,
      default: () => []
    },
    autoplay: {
      type: String
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
    link: String,
    embedCode: String,
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
      helper: false,
      helperText: '',
      openInfos: this.directLink,
      basicStyle: {
        position: 'relative',
        height: '0',
        width: '100%',
        'padding-bottom': (this.ratio * 100) + '%'
      }
    }
  },
  computed: {
    href() {
      return window.location.origin +
      routePrefixer + videoDetailRoute.path.replace(':video', this.id)
    },
    computedStyle() {
      return {...this.basicStyle, ...this.style}
    },
    currentVideo() {
      return this.directLink || this.store.state.currentVideo === this.src
    },
    src() {
      return this.embedCode
    },
    scriptWithStageDirections() {
      return this.script
          .replace(/\[\.\.\.\]/g, '{...}')
          .replace(/\[([^\]]+)\]/g,`<i>~$1~</i>`)
          .replace(/\(([^)]+)\)/g,`<em>($1)</em>`)
          .replace(/{\.\.\.}/g, '[...]')
    }
  },
  methods: {
    trans,
    setCurrentVideo() {
      this.store.setCurrentVideo(this.src)
    },
    copyToClipboard(value, {type}, $event = null) {
      if ($event) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      copyToClipboard(value, () => {
        let helperText = this.helperText = this.trans('clipboard:copied', {item: ucFirst(type)})
        this.helper = true
        setTimeout(() => {
          if (this.helperText === helperText) {
            this.helper = false
          }
        }, 3000)
      })
    }
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/variable';
@import '~@/assets/css/fonticon.css';

.video-component {
  @include video-component;
  background: rgba(255, 255, 255, .3);
  flex-direction: column;
  height: min-content;
  position: relative;

  &.openInfos {
    height: auto;
  }

  .text {
    word-wrap: break-word;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-start;
    font-size: 0.9rem;
    padding: 7.5px 7.5px 0;
    .script {
      text-align: left;
      white-space: pre-line;
      //font-size: .8rem;
      i {
        display: block;
        text-align: center;
      }
    }
    h2 {
      font-size: 1.1rem;
      margin: 15px 0 7.5px;
      position: relative;
      display: block;
      em {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: calc(100% - 32px);
      }
      & + div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0s .3s linear, transform .3s ease;
        transform: scaleY(0);
        transform-origin: top left;
        &.show {
          max-height: 100%;
          transform: scaleY(1);
          transition: max-height 0s linear, transform .3s ease;
        }
      }
    }
    &.open {
      h2 {
        em {
          white-space: normal;
        }
      }
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
  }

  img, .click {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    cursor: pointer;
  }

  .click {
    $play-btn-color: #888;
    $play-btn-bgcolor: rgba(255, 255, 255, .8);
    $play-btn-size: 3rem;
    pointer-events: none;
    border: 3px solid $play-btn-color;
    border-radius: 100%;
    width: $play-btn-size;
    height: $play-btn-size;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $play-btn-bgcolor;
    @media screen and (min-width: 1024px) {
      opacity: .7;
      .video-container:hover & {
        opacity: 1;
      }
    }

    &:after {
      content: '▶';
      color: $play-btn-color;
      font-size: $play-btn-size * 0.5;
      padding-left: $play-btn-size * .15;
    }
  }

  @media screen and (min-width: 1024px) {
    &:hover .click {
      opacity: 1;
    }
  }
}

@keyframes softblink {
  0% {
    background: rgba(0, 0, 0, 0.15);
  }
  50% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.15);
  }
}

.overlay {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: 0 0 3px 5px rgba(0, 0, 0, 0.7) inset;
  animation: 3s ease-in-out infinite softblink;
  z-index: 10;
}

.code {
  word-break: break-all;
  border: 1px solid #888;
  user-select: all;
  -moz-user-select: all;
  font-family: monospace;
  font-size: 0.6rem;
  max-height: 75px;
  overflow-y: auto;
}

.info-toggler {
  cursor: pointer;

  em {
    font-style: normal;
    //text-decoration: underline;
    //text-decoration-style: dotted;
  }

  span {
    transform-origin: 50% 50%;
    display: inline-block;
    vertical-align: top;

    &.openInfos {
      transform: translateY(-3px) rotate(180deg);
    }
  }
}

.characters {
  font-weight: bold;
}

#copy-links {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  z-index: 12;
  a {
    @include btn;
    color: black;
  }
  .helper {
    position: absolute;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 3px;
    font-size: 0.8rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;

    right: 0;
    top: 100%;
    width: 215px;
    line-height: 24px;
    border-radius: 3px;

    &.active {
      transition: opacity 0s ease;
      opacity: 1;
    }
  }
}


</style>