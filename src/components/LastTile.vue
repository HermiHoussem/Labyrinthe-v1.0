<template>
  <div>
    <h2>Tuile à placer</h2>
    <button @click="game.lastTile.rotation += 1">↻</button>
    <div class="tile-out-placeholder tile-placeholder"></div>
    <button @click="game.lastTile.rotation -= 1">↺</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import TileCmp from "./TileCmp"
import {game} from "../game"
import {shiftArray} from "../helpers"

@Component({
  components: { TileCmp }
})
export default class LastTile extends Vue {
  data(){
    return { game }
  }
}
</script>

<style scoped>
button {
  margin: 0.5em;
}
</style>
