import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {CategoryEnum} from "../app/core/enums/CategoryEnum";
import {computed} from "@angular/core";
import {Box} from "../app/core/types/Box";
import {Symbol} from "../app/core/types/Symbol";
import {AppState} from "./state interfaces/BoxState";
import {symbolsArray} from "../app/core/types/Symbol";

const initBoxes = [
  {
    index: 1,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 2,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 3,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 4,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 5,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 6,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 7,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 8,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 9,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  },
  {
    index: 10,
    value: { text : '', score: 0, category: CategoryEnum.INITIAL}
  }
]
export const AppStore = signalStore(
  {providedIn: 'root'},
  withState<AppState>({
    boxesValue : initBoxes,
    selectedBox: {
      index: 0,
      value: {
        text: '',
        category: CategoryEnum.INITIAL,
        score: 0
      }
    },
    selectedSymbol: {
      text: '',
      score: 0,
      category: CategoryEnum.INITIAL
    },
    symbolArray: symbolsArray,
    totalValue: 0,
    symbolToColor: {
      text: '',
      category: CategoryEnum.INITIAL,
      score: 0
    }
  }),
  withComputed(({boxesValue, selectedBox, selectedSymbol, symbolArray, totalValue, symbolToColor}) => ({
    updatedBoxValues: computed(()=>boxesValue()),
    boxesLength: computed(()=>boxesValue().length * selectedBox().index),
    getSelectedBox: computed(()=> selectedBox()),
    getSelectedSymbol: computed(()=> selectedSymbol()),
    getTotalValue: computed(()=> totalValue()),
    symbolToColor: computed(()=> symbolToColor()),

    fsSymbols: computed(()=> symbolArray().filter(s=>s.category === CategoryEnum.FS)),
    bsSymbols: computed(()=> symbolArray().filter(s=>s.category === CategoryEnum.BS)),
    otherSymbols: computed(()=> symbolArray().filter(s=>s.category === CategoryEnum.OTHER)),
  })),
  withMethods((store)=>({
    selectBox(box: Box){
      patchState(store, {
        selectedBox: {
          index: box.index,
          value: {
            text: box.value.text,
            category: box.value.category,
            score: box.value.score
          }
        },

      });
      patchState(store, {symbolToColor: box.value});
    },
    selectSymbol(sym: Symbol){
      patchState(store, {selectedSymbol: sym});
      patchState(store, {symbolToColor: sym});

      patchState(store, {
        boxesValue: store.updatedBoxValues().map((boxItem: Box)=>{
          if (boxItem.index === store.selectedBox().index){
            return {index: boxItem.index, value: sym}
          }
          return boxItem;
        })
      })
      localStorage.setItem('boxHistory', JSON.stringify(store.updatedBoxValues()))

      if((store.selectedBox().value.text !== store.getSelectedSymbol().text) && store.selectedBox().value.text ===''){
        patchState(store, {totalValue: store.totalValue()+store.getSelectedSymbol().score});
        localStorage.setItem('totalValue', store.totalValue().toString())
      }
      if((store.selectedBox().value.text !== store.getSelectedSymbol().text) && store.selectedBox().value.text !==''){
        patchState(store, {totalValue: store.totalValue()-store.selectedBox().value.score +store.getSelectedSymbol().score});
        localStorage.setItem('totalValue', store.totalValue().toString())
      }

      if (store.getSelectedBox().index === 10){
        if (store.getSelectedBox().value.score === 0){
          patchState(store, {totalValue: store.getTotalValue()});
        }else {
          patchState(store, {totalValue: store.totalValue()-store.getSelectedBox().value.score + store.selectedSymbol().score});
        }
        localStorage.setItem('totalValue', store.totalValue().toString())
      }

      if (store.getSelectedBox().index < 10) {
        patchState(store, {
          selectedBox: {
            index: store.getSelectedBox().index+1,
            value:
              {
                text: '',
                score: 0,
                category:CategoryEnum.INITIAL
              }
            },

        });

      }
    },
    clearBoxes(){
      patchState(store, {boxesValue: initBoxes});
      patchState(store, {totalValue: 0});
      patchState(store, {symbolToColor: {
          text: '',
          category: CategoryEnum.INITIAL,
          score: 0
        }});
      localStorage.clear();
    }
  })),
  withHooks({onInit(store){
      patchState(store, {boxesValue: localStorage.getItem('boxHistory') ? JSON.parse(localStorage.getItem('boxHistory')!) : store.boxesValue()})
      patchState(store, {totalValue: localStorage.getItem('totalValue') ? parseFloat(localStorage.getItem('totalValue')!) : 0});
    }})
)

