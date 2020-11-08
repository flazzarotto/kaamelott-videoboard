<template>
  <nav>
    <div>
      <input type="text" v-model="search" @input="updateSearch()" placeholder="Recherche..."/>
      <button :class="{show: search.length || selectedBook}" @click="raz()">
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
import {useStore} from "@/store/store"
import leodagan from '@/assets/leodagan.gif'
import {paramsCalculator} from "@/router/paramsCalculator";

export default {
  name: "SearchBar",
  data() {
    return {
      selectedBook: null,
      selectedTome: null,
      selectedEpisode: null,
      search: this.store.state.search.fullText,
      episodes: this.store.state.search.episodes,
      leodagan
    }
  },
  methods: {
    raz() {
      this.search = ''
      this.selectedEpisode = this.selectedTome = this.selectedBook = null
      this.$router.push({query: {}})
    },
    updateEpisode() {
      if (this.selectedBook === null) {
        this.selectedTome = null
      }
      if (this.selectedTome === null) {
        this.selectedEpisode = null
      }

      let findEpisodes = [this.selectedBook, this.selectedTome, this.selectedEpisode].map(x => x ?? '').join('')

      this.$router.push({query: paramsCalculator(this.$route.query, {findEpisodes})})
    },
    updateSearch() {
      this.$router.push({query: paramsCalculator(this.$route.query, {fullText: this.search})})
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
    return {store: useStore()}
  }
}
</script>

<style scoped lang="scss">
select, input, button {
  font-size: 1.5rem;
  width: 80%;
}

select {
  width: auto;
}

nav {
  display: flex;
  flex-direction: column;
  padding: 15px 7.5px;

  div {
    display: flex;
    justify-content: left;
    width: 100%;

    & + div {
      padding-top: 15px;
      width: 800px;
      justify-content: space-between;

      select + select {
        margin-left: 5px;
      }

      @media screen and (max-width: 600px) {
        flex-direction: column;
        width: 100%;
        select {
          display: block;

          & + select {
            margin-left: 0;
            margin-top: 5px;
          }
        }
      }
    }
  }
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