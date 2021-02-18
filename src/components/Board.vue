<template>
  <div class="board" @mouseout.self="game.lastTile.moveOut()">
    <table>
      <tr>
        <td></td>
        <td v-for="(col, x) in game.boardWidth">
          <MoveMarker direction="bottom" :row="-1" :col="x" />
        </td>
        <td></td>
      </tr>
      <tr v-for="(row, y) in game.boardHeight">
        <td><MoveMarker direction="right" :row="y" :col="-1" /></td>

        <td v-for="(col, x) in game.boardWidth">
          <div class="tile-placeholder"></div>
        </td>

        <td><MoveMarker direction="left" :row="y" :col="game.boardWidth" /></td>
      </tr>
      <tr>
        <td></td>
        <td v-for="(col, x) in game.boardWidth">
          <MoveMarker direction="top" :row="game.boardHeight" :col="x"/>
        </td>
        <td></td>
      </tr>
    </table>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {game} from "../game"
import {TileState} from "../tiles"

import MoveMarker from "./MoveMarker.vue";

@Component({
  components: { MoveMarker }
})
export default class Board extends Vue {
  data(){
    return {
      game
    }
  }
}
</script>

<style scoped>
.board {
  padding: 10px;
  margin: 0 40px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 25px;
}

table {
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
}
td {
  width: 100px;
  height: 100px;
}
</style>
