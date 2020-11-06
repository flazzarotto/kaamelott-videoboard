<template>
  <input type="text" v-model="search" @input="updateSearch()" />
</template>

<script>
import {useState} from "@/store/store"

export default {
  name: "SearchBar",
  data() {
    return {
      search: this.state.search
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

<style scoped>
input {

}
</style>