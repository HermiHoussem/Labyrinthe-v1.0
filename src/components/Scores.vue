<template>
  <div>
    <h2>Scores:</h2>
    <ul>
      <li v-for="player in game.players">
        <Pawn :player="player" />
        Joueur {{player.number+1}} :
        <strong>{{player.score}}</strong> <img src="../assets/treasure_open.png" alt="trésors">
        <strong>{{player.keys}}</strong> <img src="../assets/key.png" alt="clés">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {game} from "../game"
import Pawn from "./Pawn.vue"

@Component({
  components: { Pawn }
})
export default class Scores extends Vue {
  data(){
    return {
      game
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

img {
  vertical-align: middle;
}

strong {
  margin: 0 0.25em 0 1em;
  color: gold;
}

.pawn {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>
