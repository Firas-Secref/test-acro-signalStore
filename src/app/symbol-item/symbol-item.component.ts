import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Symbol} from "../core/types/Symbol";
import {NgStyle} from "@angular/common";
import {AppStore} from "../../store/AppStore";

@Component({
  selector: 'app-symbol-item',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './symbol-item.component.html',
  styleUrl: './symbol-item.component.scss'
})
export class SymbolItemComponent {


  @Input() symbolObj!: Symbol;
  @Input() symbolToColor!: Symbol;
  @Output() symbolSelection = new EventEmitter<Symbol>
  appStore = inject(AppStore)

  selectSymbol() {
    this.symbolSelection.emit(this.symbolObj);

  }


}
