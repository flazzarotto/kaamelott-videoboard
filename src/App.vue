<template>
  <h1>
    <figure><img :src="Perceval" alt="Perceval"/></figure>
    {{ trans('app_title') }}
  </h1>
  <router-view></router-view>
</template>

<script>
import Perceval from '@/assets/perceval.png'
import {useStore} from "@/store/store"
import {trans} from '@/lib/functions/trans'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      Perceval
    }
  },
  methods: {
    trans
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/global';

h1 {
  @include kaamelott;
  font-size: 3rem;

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
  overflow: hidden;
}

#videos {
  margin: auto;
}
</style>
