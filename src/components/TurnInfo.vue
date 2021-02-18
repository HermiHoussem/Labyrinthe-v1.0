<template>
  <div>
    <p v-if="game.currentPlayer">
      <Pawn :player="game.currentPlayer"></Pawn>
      Au tour du joueur {{game.currentPlayer.number + 1}}.
    </p>
    <p v-if="game.hasMovedTiles">Déplacez votre pion en cliquant de tuile en tuile.</p>
    <p v-else>Cliquez sur une flèche pour insérer la tuile à cet endroit.</p>
    <button @click="game.nextTurn()" v-if="game.hasMovedTiles">Terminer le tour</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {game} from "../game"
import Pawn from "./Pawn.vue";

@Component({
  components: { Pawn }
})
export default class TurnInfo extends Vue {
  data(){
    return { game }
  }
}
</script>

<style scoped>
.pawn {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>
