import {Component, effect, inject, OnInit} from '@angular/core';
import {symbolsArray, Symbol} from "../core/types/Symbol";
import {SymbolItemComponent} from "../symbol-item/symbol-item.component";
import {CategoryEnum} from "../core/enums/CategoryEnum";
import {AppStore} from "../../store/AppStore";

@Component({
  selector: 'app-symbol-container',
  standalone: true,
  imports: [
    SymbolItemComponent
  ],
  templateUrl: './symbol-container.component.html',
  styleUrl: './symbol-container.component.scss',
})
export class SymbolContainerComponent implements OnInit{

  ngOnInit(): void {
  }

  constructor() {

  }

  protected readonly symbolsArrayFS = symbolsArray.filter(s=>s.category === CategoryEnum.FS);
  protected readonly symbolsArrayBS = symbolsArray.filter(s=>s.category === CategoryEnum.BS);
  protected readonly symbolsArrayOther = symbolsArray.filter(s=>s.category === CategoryEnum.OTHER);
  protected readonly CategoryEnum = CategoryEnum;


  selectSymbol(sym: Symbol) {

    this.appStore.selectSymbol(sym);

  }

  appStore = inject(AppStore)
}
