<template>
  <nav>
    <div>
      <input type="text" v-model="search" @input="updateSearch()"
             :placeholder="trans('search:fulltext:placeholder')"/>
      <button v-show="search.length || selectedBook" @click="raz()">
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
      <label class="order">
        Tri
        <select id="orderBy" v-model="orderBy" @change="updateOrder(true)">
          <option v-for="(func, order) in availableSorts" :key="order" :value="order">
            {{ trans('search:order:' + order) }}
          </option>
        </select>
      </label>
      <label class="sort">
        <input type="checkbox" v-model="sortAsc" @change="updateOrder()"/>
        <button>
          {{
            (orderBy === 'random')
                ? trans('search:sort:random')
                : (sortAsc ? trans('search:sort:asc') : trans('search:sort:desc'))
          }}
        </button>
      </label>
    </div>
  </nav>
</template>

<script>
import {useStore} from "@/store/store"
import Leodagan from '@/assets/leodagan.gif'
import {paramsCalculator} from "@/router/paramsCalculator";
import {trans} from "@/lib/functions/trans";
import {episodeParser} from "@/lib/functions/episodeParser";
import {availableSorts} from "@/lib/FullTextSearch";

export default {
  name: "SearchBar",
  data() {
    return {
      selectedBook: episodeParser(this.store.state.search.findEpisodes)[0],
      selectedTome: episodeParser(this.store.state.search.findEpisodes)[1],
      selectedEpisode: episodeParser(this.store.state.search.findEpisodes)[2],
      search: this.store.state.search.fullText,
      episodes: this.store.state.episodes,
      leodagan: Leodagan,
      orderBy: this.store.state.search.order,
      sortAsc: (this.store.state.search.sort === 'asc'),
    }
  },
  computed: {
    availableSorts() {
      return availableSorts
    }
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
    updateOrder(reinitSort = false) {
      this.sortAsc = reinitSort || this.sortAsc
      const sort = (this.sortAsc ? 'asc' : 'desc')
      this.$router.push({query: paramsCalculator(this.$route.query, {sort, order: this.orderBy})})
    },
    // search for book / tome / episode number
    updateEpisode() {
      if (this.selectedBook == null) {
        this.selectedTome = null
      }
      if (this.selectedTome == null) {
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
      return this.trans('episode:' + string.charAt(0), {number: string.substring(1)})
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
  width: 100%;
  height: min-content;
}

select {
  width: auto;
}

.order {
  display: flex;
  flex-direction: row;
  align-items: baseline;

  select {
    margin-left: 5px;
  }
}

.sort {
  position: relative;

  input[type=checkbox] {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  button {
    font-size: 25px;
    color: inherit;
    pointer-events: none;
  }
}

nav {
  display: flex;
  flex-direction: column;
  padding: 15px 7.5px;

  div {
    display: flex;
    justify-content: left;
    width: 100%;
    align-items: center;

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

  position: relative;

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