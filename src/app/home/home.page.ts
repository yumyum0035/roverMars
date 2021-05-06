import { Component, OnInit } from '@angular/core';
import { Rover, Square } from '../interfaces/interfaces';
import { HelperServiceService } from '../services/helper-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  width: string;
  height: string;
  square: Square = { width: 0, height: 0 };
  orientation: string;
  orders = [];

  //aqui subscribimos al observable

  constructor(private helperService: HelperServiceService) { }

  getWidthValue(data) {
    this.width = `${data}px`;
    console.log(`width: ${this.width}, data: ${data}`);
    this.square.width = data;
  }

  getHeightValue(data) {
    this.height = `${data}px`;
    console.log(`height: ${this.height}, data: ${data}`);
    this.square.height = data;
  }

  getOrders(data): 'A'|'L'|'R' {
    const upperCase = data.toUpperCase();
    const orders = upperCase.split('');
    console.log(orders);
    return this.orders = orders;
  }

  getCoords(data) {
    //crea coordenadas a partir del input de usuario
  }
}
