<template>
  <div class="tile"
       :class="{ clickable: game.hasMovedTiles }"
       :style="style"
       @click="onClickTile()">
    <img src="../assets/key.png" class="item" v-if="hasKey">
    <img src="../assets/treasure.png" class="item" v-if="hasTreasure">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

import {Tile, TileState, Item} from "../tiles"
import {game} from "../game"

@Component({
  components: {  }
})
export default class TileCmp extends Vue {
  @Prop() tile: Tile;

  data(){
    return { game }
  }

  get style(){
    const placeholder = document.querySelector(".tile-out-placeholder")
    const board = document.querySelector(".board table")

    let top, left;
    let {row, col, state, rotation, type} = this.tile;

    if((state === TileState.OnBoard || state === TileState.OnMarker) && board instanceof HTMLElement) {
      top = board.offsetTop + 100 * row + 100
      left = board.offsetLeft + 100 * col + 100
    }
    else if(state === TileState.Out && placeholder instanceof HTMLElement){
      top = placeholder.offsetTop
      left = placeholder.offsetLeft
    }

    return {
      backgroundImage: `url(src/assets/${type.sprite})`,
      transform: `rotate(${90 * rotation}deg)`,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: state === TileState.OnBoard ? 1 : 2
    }
  }

  get pawnStyle(){
    return {
      transform: `rotate(${-90 * this.tile.rotation}deg)`,
    }
  }

  onClickTile(){
    if(this.tile.state === TileState.OnMarker && !game.hasMovedTiles){
      game.moveTiles(this.tile.row, this.tile.col)
    } else if(this.tile.state === TileState.OnBoard && game.hasMovedTiles){
      game.movePawn(this.tile.row, this.tile.col);
    }
  }

  get hasKey(){
    return this.tile.item === Item.Key
  }

  get hasTreasure(){
    return this.tile.item === Item.Treasure
  }
}
</script>

<style scoped>
.tile {
  position: absolute;
  display: inline-block;
  width: 96px;
  height: 96px;
  border-radius: 16px;
  background-size: 96px 96px;
  transition: all ease-in-out 300ms;
}

.tile.clickable:hover {
  cursor: pointer;
  box-shadow: 0 0 5px gold;
}

.item, .pawn {
  position: absolute;
  top: 32px;
  left: 32px;
  right: 32px;
  bottom: 32px;
}

.pawn {
  margin: 6px 2px;
}
</style>
