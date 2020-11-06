<template>
  <nav>
    <div>
      <input type="text" v-model="search" @input="updateSearch()" placeholder="Recherche..."/>
      <button :class="{show: search.length}" @click="search = ''; updateSearch()">
        <span>Tout cramer et reprendre à zéro</span>
        <img :src="leodagan" alt="Réinitialiser"/>
      </button>
    </div>
    <div>
      <select id="book" v-model="selectedBook" title="Livre" @change="updateEpisode()">
        <option selected :value="null">Tous les livres</option>
        <option v-for="(val, book) in episodes" :key="book" :value="book">{{ trans(book) }}</option>
      </select>
      <select id="tome" v-model="selectedTome" :class="{hidden: selectedBook === null}" title="Tome"
              @change="updateEpisode()">
        <option selected :value="null">Tous les tomes</option>
        <option v-for="(val, tome) in selectedBook? episodes[selectedBook] : []" :key="tome" :value="tome">
          {{ trans(tome) }}
        </option>
      </select>
      <select id="episode" v-model="selectedEpisode" :class="{hidden: selectedTome === null }"
              title="Episode" @change="updateEpisode()">
        <option selected :value="null">Tous les épisodes</option>
        <option v-for="(val, episode) in (selectedBook && selectedTome) ? episodes[selectedBook][selectedTome] : []"
                :key="episode" :value="episode">
          {{ [trans(episode), val].join(' : ') }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script>
import {useState} from "@/store/store"
import leodagan from '@/assets/leodagan.gif'

export default {
  name: "SearchBar",
  data() {
    return {
      selectedBook: null,
      selectedTome: null,
      selectedEpisode: null,
      search: this.state.search,
      episodes: this.state.episodes,
      leodagan
    }
  },
  methods: {
    updateEpisode() {
      if (this.selectedBook === null) {
        this.selectedTome = null
      }
      if (this.selectedTome === null) {
        this.selectedEpisode = null
      }
      // TODO
    },
    updateSearch() {
      this.state.changeSearch(this.search)
    },
    trans(string) {
      switch (string.charAt(0)) {
        case 'L':
          return 'Livre ' + string.substring(1)
        case 'T':
          return 'Tome ' + string.substring(1)
        case 'E':
          return 'Episode ' + string.substring(1)
        default:
          return;
      }
    }
  },
  setup() {
    return {state: useState()}
  }
}
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;
  padding: 15px 7.5px;

  div {
    display: flex;
    justify-content: left;
    width: 100%;
  }
}

select, input, button {
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

select.hidden {
  opacity: 0;
  pointer-events: none;
}

</style>