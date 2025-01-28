import { State } from "../interfaces/state.interface";

export const startState: State = {
  board: Array(9).fill(""),
  currentPlayer: "X",
  winner: null,
};
