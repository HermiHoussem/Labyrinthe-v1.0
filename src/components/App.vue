<template>
  <div id="app">
    <header>
      <h1>Jeu du Labyrinthe</h1>
      <p>Récupérez les clés et allez ouvrir les coffres.
        Le premier à ouvrir {{game.nbChestsToWin}} coffres a gagné.</p>
    </header>

    <Board></Board>
    <TurnInfo></TurnInfo>
    <LastTile></LastTile>
    <Scores></Scores>
    <GameParams></GameParams>

    <TileCmp v-for="tile in game.tiles" key="i" :tile="tile"></TileCmp>

    <Pawn v-for="player in game.players" :player="player" :key="player.number" :onBoard="true"></Pawn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Board from './Board'
import TurnInfo from './TurnInfo'
import LastTile from './LastTile'
import Scores from './Scores'
import GameParams from './GameParams'
import TileCmp from './TileCmp'
import Pawn from './Pawn'

import {game} from "../game"

@Component({
  components: {
    Board, TileCmp, TurnInfo, LastTile, Scores, GameParams, Pawn },
  name: "App"
})
export default class App extends Vue {
  data(){
    return {
      game
    }
  }

  mounted(){
    game.start();

    window.addEventListener("resize", () => {
      const savedTiles = game.tiles;
      const savedPlayers = game.players;
      game.tiles = [];
      game.players = []
      requestAnimationFrame(() => {
        game.tiles = savedTiles;
        game.players = savedPlayers;
      })
    })
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  min-height: 1150px;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Lobster Two', cursive, Calibri, sans-serif;
  font-size: 20px;
}

#app {
  background-color: #2c3e50;
  color: coral;
  user-select: none;
  grid-kiss:
    "  +-----------------------------------------------------------------+        "
    "  |                                                                 |        "
    "  |                         header                                  |   120px"
    "  |                                                                 |        "
    "  +-----------------------------------------------------------------+        "
    "                                                                             "
    "  +----------------------------------------+  +---------------------+        "
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  |                                        |  |      TurnInfo       |   200px"
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  |                                        |  +---------------------+        "
    "  |                                        |  +---------------------+        "
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  |                                        |  |      LastTile       |        "
    "  |               Board                    |  |                     |   400px"
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  |                                        |  +---------------------+        "
    "  |                                        |  +---------------------+        "
    "  |                                        |  |                     |        "
    "  |                                        |  |       Scores        |        "
    "  |                                        |  |                     |   320px"
    "  |                                        |  |                     |        "
    "  |                                        |  |                     |        "
    "  +-------------- 1000px ------------------+  +------- 400px -------+        "
    "                                                                         auto"
    "  +-----------------------------------------------------------------+        "
    "  |                                                                 |        "
    "50|                       GameParams                                |    50px"
    "  |                                                                 |        "
    "  +-----------------------------------------------------------------+        "
}

header {
  text-align: center;
}

.tile-placeholder {
  display: inline-block;
  width: 96px;
  height: 96px;
  border: 2px solid chocolate;
  border-radius: 14px;
  vertical-align: middle;
}

input, button {
  border: 1px solid burlywood;
  background: transparent;
  color: burlywood;
  font-size: 120%;
  font-family: 'Lobster Two', cursive, Calibri, sans-serif;
}

button {
  cursor: pointer;
}
button:hover {
  background-color: antiquewhite;
  color: blueviolet;
}
</style>
