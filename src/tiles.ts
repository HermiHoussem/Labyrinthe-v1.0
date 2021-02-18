import {randomInt, shiftArray} from "./helpers";
import {Player} from "./player";
import {game} from "./game";

export enum TileState { OnBoard, OnMarker, Out }

export enum Item { Key, Treasure }

export class Tile {
  state?: TileState;
  row?: number;
  col?: number;
  type: TypeTile;
  rotation: number;
  item?: Item;

  constructor(type: TypeTile){
    this.type = type;
    this.rotation = randomInt(0, 3);
    this.row = null;
    this.col = null;
    this.state = null;
    this.item = null;
  }

  moveOut(){
    this.row = null;
    this.col = null;
    this.state = TileState.Out
  }

  moveToBoard(row: number, col: number){
    this.row = row;
    this.col = col;
    this.state = TileState.OnBoard
  }

  moveToMarker(row: number, col: number){
    this.row = row;
    this.col = col;
    this.state = TileState.OnMarker
  }

  canMoveTo(next: Tile): boolean {
    if(this.col === next.col && this.row-1 === next.row && !this.walls.top && !next.walls.bottom) return true; // top
    if(this.col === next.col && this.row+1 === next.row && !this.walls.bottom && !next.walls.top) return true; // down
    if(this.col-1 === next.col && this.row === next.row && !this.walls.left && !next.walls.right) return true; // left
    if(this.col+1 === next.col && this.row === next.row && !this.walls.right && !next.walls.left) return true; // right
    return false;
  }

  get walls(){
    let [top, right, bottom, left] = shiftArray(this.type.walls, this.rotation)
    return { top, right, bottom, left }
  }


  getPlayersOnIt(): Player[] {
    return game.players.filter(player => player.tile === this)
  }
}

export class TypeTile {
  walls: [number, number, number, number]; // top right bottom left ; 0=free 1=wall
  sprite: string; // image url

  constructor(props: { sprite: string, walls: [number, number, number, number] }){
    Object.assign(this, props)
  }
}

export const TypeTileI = new TypeTile({ sprite: "tileI.jpg", walls: [0,1,0,1] })
export const TypeTileL = new TypeTile({ sprite: "tileL.jpg", walls: [0,0,1,1] })
export const TypeTileT = new TypeTile({ sprite: "tileT.jpg", walls: [1,0,0,0] })
export const TypeTileU = new TypeTile({ sprite: "tileU.jpg", walls: [1,1,0,1] })

export function getAllTiles(){
  return [
    ...Array(14).fill(TypeTileI), // tout droit
    ...Array(24).fill(TypeTileL), // les coins
    ...Array(10).fill(TypeTileT), // les T
    ...Array(2).fill(TypeTileU)
  ].map(type => new Tile(type))
}
