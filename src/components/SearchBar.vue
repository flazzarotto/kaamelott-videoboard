<template>
  <nav>
    <div>
      <input type="text" v-model="search" @input="updateSearch()"
             :placeholder="trans('search:fulltext:placeholder')"/>
      <button :class="{show: search.length || selectedBook}" @click="raz()">
        <span>{{ trans('search:reset:helper') }}</span>
        <img :src="leodagan" :alt="trans('search:reset')"/>
      </button>
    </div>
    <div>
      <select id="book" v-model="selectedBook" :title="trans('episode:L',{number: ''})"
              @change="updateEpisode()">
        <option selected :value="null">{{ trans('search:episode:allBooks') }}</option>
        <option v-for="(val, book) in episodes" :key="book" :value="book">{{ trans_episode(book) }}</option>
      </select>
      <select id="tome" v-model="selectedTome" :class="{hidden: selectedBook === null}"
              :title="trans('episode:T',{number: ''})"
              @change="updateEpisode()">
        <option selected :value="null">{{ trans('search:episode:allTomes') }}</option>
        <option v-for="(val, tome) in selectedBook? episodes[selectedBook] : []" :key="tome" :value="tome">
          {{ trans_episode(tome) }}
        </option>
      </select>
      <select id="episode" v-model="selectedEpisode" :class="{hidden: selectedTome === null }"
              :title="trans('episode:E',{number: ''})" @change="updateEpisode()">
        <option selected :value="null">{{ trans('search:episode:allEpisodes') }}</option>
        <option v-for="(val, episode) in (selectedBook && selectedTome) ? episodes[selectedBook][selectedTome] : []"
                :key="episode" :value="episode">
          {{ [trans_episode(episode), val].join(' : ') }}
        </option>
      </select>
    </div>
  </nav>
</template>

<script>
import {useStore} from "@/store/store"
import Leodagan from '@/assets/leodagan.gif'
import {paramsCalculator} from "@/router/paramsCalculator";
import {trans} from "@/lib/functions/trans";
import {episodeParser} from "@/lib/functions/episodeParser";

export default {
  name: "SearchBar",
  data() {
    return {
      selectedBook: episodeParser(this.store.state.search.findEpisodes)[0],
      selectedTome: episodeParser(this.store.state.search.findEpisodes)[1],
      selectedEpisode: episodeParser(this.store.state.search.findEpisodes)[2],
      search: this.store.state.search.fullText,
      episodes: this.store.state.episodes,
      leodagan: Leodagan
    }
  },
  computed: {
  },
  methods: {
    // reset form
    raz() {
      this.selectedBook = null
      this.selectedTome = null
      this.selectedEpisode = null
      this.search = ''
      this.$router.push({query: {}})
    },
    // search for book / tome / episode number
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
    // fulltext search
    updateSearch() {
      this.$router.push({query: paramsCalculator(this.$route.query, {fullText: this.search})})
    },
    trans,
    trans_episode(string) {
      return this.trans('episode:'+string.charAt(0), {number: string.substring(1)})
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