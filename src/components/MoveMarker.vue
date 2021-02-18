<template>
  <div class="marker"
       v-if="canMove"
       @mouseover="onMouseOver"
       :class="{ active: !game.hasMovedTiles, [direction]: true }">
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {game} from "../game"

@Component({
  components: { }
})
export default class MoveMarker extends Vue {
  @Prop() direction: string;
  @Prop() row: number;
  @Prop() col: number;

  data(){
    return {
      game
    }
  }

  onMouseOver(){
    if(!game.hasMovedTiles){
      game.lastTile.moveToMarker(this.row, this.col)
    }
  }

  get canMove(){
    if(game.hasMovedTiles) return false;
    if(game.lastMove === null) return true;

    let [lastRow, lastCol] = game.lastMove;
    let invertRow = lastRow === -1 ? game.boardHeight : lastRow === game.boardHeight ? -1 : lastRow;
    let invertCol = lastCol === -1 ? game.boardWidth : lastCol === game.boardWidth ? -1 : lastCol;
    return this.row !== invertRow || this.col !== invertCol;
  }
}
</script>

<style scoped>
.marker {
  width: 96px;
  height: 96px;
  background: url('../assets/arrow_button.png') no-repeat center center;
}

.marker.active:hover {
  background-image: url('../assets/arrow_button_active.png');
}

.marker.top { transform: rotate(0deg) }
.marker.right { transform: rotate(90deg) }
.marker.left { transform: rotate(-90deg) }
.marker.bottom { transform: rotate(180deg) }
</style>
