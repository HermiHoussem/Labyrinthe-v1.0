import {Tile} from "./tiles";

export class Player {
  score: number;
  keys: number;
  color: string;
  number: number;
  tile: Tile;

  static colors=[
    "blue",
    "darkred",
    "darkgreen",
    "gold"
  ]

  constructor(n: number){
    this.score = 0;
    this.keys = 0;
    this.number = n;
    this.color = Player.colors[n];
    this.tile = null;
  }
}
