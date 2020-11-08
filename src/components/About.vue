<template>
  <section>
    <router-link :to="{name: 'home'}" class="link">Retour</router-link>
    <h2>{{ trans('title:about', {item: trans('app_title')}) }}</h2>
    <article>
      <p>TODO</p>
    </article>
    <aside>
      <h3>{{ trans('title:contact') }}</h3>
      <p>TODO</p>
    </aside>
  </section>
</template>
<script>
import {useStore} from "@/store/store"
import {trans} from "@/lib/functions/trans"

export default {
  name: "About",
  methods: {
    trans
  },
  setup() {
    return {store: useStore()}
  }
}
</script>

<style scoped>

</style>