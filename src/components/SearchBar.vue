<template>
  <div>
    <input type="text" v-model="search" @input="updateSearch()" placeholder="Recherche..." />
    <button :class="{show: search.length}" @click="search = ''; updateSearch()">
      <span >Tout cramer et reprendre à zéro</span>
      <img :src="leodagan" alt="Réinitialiser" />
    </button>
  </div>
</template>

<script>
import {useState} from "@/store/store"
import leodagan from '@/assets/leodagan.gif'

export default {
  name: "SearchBar",
  data() {
    return {
      search: this.state.search,
      leodagan
    }
  },
  methods: {
    updateSearch() {
      this.state.changeSearch(this.search)
    }
  },
  setup() {
    return {state: useState()}
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  width: 100%;
  padding: 15px 7.5px;
  justify-content: left;
}
input, button {
  border-radius: 0;
  font-size: 1.5rem;
  width: 80%;
}
button {
  width: auto;
  color: white;
  font-weight: bold;
  padding: 0;
  font-size: 0;

  pointer-events: none;
  opacity: 0;
  position: relative;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }

  span {
    position: absolute;
    opacity: 0;
    font-size: 1rem;
    color: white;
    bottom: 0;
  }
  &:hover, &:active {
    span {
      opacity: 1;
    }
  }
}
</style>