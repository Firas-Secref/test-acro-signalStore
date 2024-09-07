import {Box} from "../../app/core/types/Box";
import {Symbol} from "../../app/core/types/Symbol";

export interface AppState{
  boxesValue: Box[],
  selectedBox: Box;
  selectedSymbol: Symbol;
  symbolToColor: Symbol;
  symbolArray: Symbol[];
  totalValue: number;
}
