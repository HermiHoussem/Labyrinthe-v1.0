import {pickRandom, shuffleArray} from "./helpers";
import {getAllTiles, Item, Tile, TileState} from "./tiles";
import {Player} from "./player";

export class Game {
  boardWidth: number;
  boardHeight: number;
  tiles: Tile[];
  players: Player[];
  nbPlayers = 2;
  nbChestsToWin = 3;
  lastMove = null;
  currentPlayer: Player;
  hasMovedTiles: boolean;

  constructor(){
    this.reset();
  }

  reset() {
    this.players = [];
    for (let i = 0; i < this.nbPlayers; i++) this.players.push(new Player(i))

    this.currentPlayer = this.players[0];
    this.hasMovedTiles = false;
    this.lastMove = null;
    this.boardWidth = 7;
    this.boardHeight = 7;
    this.tiles = getAllTiles()
  }

  start(){
    shuffleArray(this.tiles);
    for (let row = 0; row < this.boardHeight; row++) {
      for (let col = 0; col < this.boardWidth; col++) {
        this.tiles[row * this.boardWidth + col].moveToBoard(row, col);
      }
    }

    this.tiles[this.tiles.length - 1].moveOut();

    const startingTiles = [
      this.getTileByRowCol(0, 0),
      this.getTileByRowCol(this.boardHeight - 1, this.boardWidth - 1),
      this.getTileByRowCol(0, this.boardWidth - 1),
      this.getTileByRowCol(this.boardHeight - 1, 0)
    ]

    this.players.forEach((player, i) => { player.tile = startingTiles[i] })

    this.getRandomEmptyTile().item = Item.Key;
    this.getRandomEmptyTile().item = Item.Key;
    this.getRandomEmptyTile().item = Item.Treasure;
  }

  get lastTile(): Tile {
    return this.tiles.find(tile => tile.state === TileState.Out || tile.state === TileState.OnMarker)
  }

  moveTiles(row:number, col:number){
    const tileToInsert = this.lastTile;

    if(row < 0){ // vers le bas
      this.tiles.filter(tile => tile.col === col).forEach(tile => tile.row++)
      this.tiles.find(tile => tile.row === this.boardHeight).moveOut()
      tileToInsert.moveToBoard(0, col)
    }
    else if(row >= this.boardHeight){
      // vers le haut
      this.tiles.filter(tile => tile.col === col).forEach(tile => tile.row--)
      this.tiles.find(tile => tile.row === -1).moveOut()
      tileToInsert.moveToBoard(this.boardHeight-1, col)
    }
    else if(col < 0){
      // vers la droite
      this.tiles.filter(tile => tile.row === row).forEach(tile => tile.col++)
      this.tiles.find(tile => tile.col === this.boardWidth).moveOut()
      tileToInsert.moveToBoard(row, 0)
    }
    else if(col >= this.boardWidth){
      // vers la gauche
      this.tiles.filter(tile => tile.row === row).forEach(tile => tile.col--)
      this.tiles.find(tile => tile.col === -1).moveOut()
      tileToInsert.moveToBoard(row, this.boardWidth-1)
    }

    this.lastTile.getPlayersOnIt().forEach(p => { p.tile = tileToInsert })

    game.lastMove = [row, col];
    game.hasMovedTiles = true;
  }

  movePawn(row: number, col: number) {
    const targetTile = this.getTileByRowCol(row, col)

    if(!this.currentPlayer.tile.canMoveTo(targetTile)) return;

    this.currentPlayer.tile = targetTile;

    if(targetTile.item === Item.Key){
      this.currentPlayer.keys++;
      targetTile.item = null;
      this.getRandomEmptyTile().item = Item.Key;
    }
    else if(targetTile.item === Item.Treasure && this.currentPlayer.keys > 0){
      this.currentPlayer.score++;
      this.currentPlayer.keys--;
      targetTile.item = null;
      this.getRandomEmptyTile().item = Item.Treasure;

      if(this.currentPlayer.score === this.nbChestsToWin){
        alert(`Le joueur ${this.currentPlayer.number+1} a gagné !`)
        this.restart();
      }
    }
  }

  getRandomEmptyTile(): Tile {
    return pickRandom(this.tiles.filter(tile => tile.item === null && tile.getPlayersOnIt().length === 0))
  }

  getTileByRowCol(row: number, col: number): Tile {
    return this.tiles.find(tile => tile.row === row && tile.col === col)
  }

  nextTurn(){
    this.currentPlayer = this.players[(this.currentPlayer.number+1) % this.nbPlayers];
    this.hasMovedTiles = false;
  }

  restart(){
    this.reset()
    this.start()
  }
}

export const game = new Game();
window['game'] = game;
