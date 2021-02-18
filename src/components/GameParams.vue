<template>
  <div>
    Nombre de joueurs :
    <span>
		<label><input type="radio" :value="2" v-model="nbPlayers" /> 2</label>
		<label><input type="radio" :value="3" v-model="nbPlayers" /> 3</label>
		<label><input type="radio" :value="4" v-model="nbPlayers" /> 4</label>
		</span>
    <span>
			<label>
				Nombre de coffres pour gagner:
				<input type="number" min="1" max="99" v-model="nbChestsToWin">
			</label>
		</span>
    <button @click="startNewGame()">Nouvelle partie</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {game} from "../game"

@Component({
  components: { }
})
export default class GameParams extends Vue {
  nbPlayers = 2;
  nbChestsToWin = 3;
  game = game;

  startNewGame(){
    game.nbPlayers = this.nbPlayers;
    game.nbChestsToWin = this.nbChestsToWin;
    game.reset();
    setTimeout(() => game.start(), 1)
  }
}
</script>

<style scoped>
label {
  margin: 0.5em;
}

input[type='number']{
  text-align: center;
  width: 3em;
}
</style>
