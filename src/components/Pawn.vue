<template>
  <div class="pawn" :style="getStyles()"></div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Tile} from "../tiles"
import {Player} from "../player"

@Component({
  components: { }
})
export default class Pawn extends Vue {
  @Prop() player: Player;
  @Prop() onBoard: Boolean;

  getStyles(){
    const styles = { backgroundColor: this.player.color }
    const board = document.querySelector(".board table")

    if(this.onBoard && this.player.tile && board instanceof HTMLElement){
      let top = board.offsetTop + 100 * this.player.tile.row + 100 + (96-20)/2
      let left = board.offsetLeft + 100 * this.player.tile.col + 100 + (96-28)/2
      Object.assign(styles, {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`
      })
    }

    return styles
  }
}
</script>

<style scoped>
.pawn {
  position: relative;
  width: 28px;
  height: 20px;
  border-radius: 100% / 50%;
  background-color: gray;
  border: 1px solid rgba(0,0,0,0.5);
  z-index: 5;
  transition: all 300ms ease-in-out;
}

.pawn:before {
  position: absolute;
  left: -1px;
  top: -1px;
  width: 28px;
  height: 10px;
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 50%;
  box-sizing: border-box;
  background-color: rgba(160, 160, 160, 0.5);
  content: '';
}
</style>
