import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Symbol} from "../core/types/Symbol";

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent implements OnInit{
  ngOnInit(): void {

  }

  @Input() boxIndex!: number;
  @Input() boxValue!: Symbol;
  @Output() boxSelection = new EventEmitter<any>()


  selectBox(boxIndex: number) {
    this.boxSelection.emit(boxIndex);
  }


}
