import {Component, inject, OnInit} from '@angular/core';
import {BoxComponent} from "../box/box.component";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {Box} from "../core/types/Box";
import {AppStore} from "../../store/AppStore";

@Component({
  selector: 'app-box-container',
  standalone: true,
  imports: [
    BoxComponent,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './box-container.component.html',
  styleUrl: './box-container.component.scss',
})
export class BoxContainerComponent implements OnInit{

  public appStore = inject(AppStore);

  ngOnInit(): void {

  }


  setOrder(i: number, boxItem: Box) {
    this.appStore.selectBox(boxItem);
  }

}
