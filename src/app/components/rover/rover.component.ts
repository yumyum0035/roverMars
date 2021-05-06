import { Component, OnInit } from '@angular/core';
import { Rover } from 'src/app/interfaces/interfaces';
import { HelperServiceService } from '../../services/helper-service.service';


@Component({
  selector: 'app-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.scss'],
})
export class RoverComponent implements OnInit {
  arrow = 'arrow-up-circle-outline';
  roverUpdated: Rover;
  orders: string[] = ['R','A','L','A','R','A','A'];

  constructor(private helperService: HelperServiceService) { }

  ngOnInit() {
    this.roverUpdated = this.helperService.roverUpdated;
  }

  setOrientation(orientation: 'N'|'S'|'E'|'W') {
    switch (orientation) {
      case 'N':
        this.arrow = 'arrow-up-circle-outline';
        break;
      case 'S':
        this.arrow = 'arrow-down-circle-outline';
        break;
      case 'E':
        this.arrow = 'arrow-forward-circle-outline';
        break;
      case 'W':
        this.arrow = 'arrow-back-circle-outline';
        break;
    }
  }

  go() {
    this.helperService.trip(this.roverUpdated, this.orders);
  }

}
