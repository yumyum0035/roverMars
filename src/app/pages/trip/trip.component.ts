import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { Rover } from '../../interfaces/interfaces';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {

  roverUpdated: Rover;

  orders: string[] = ['R','A','L'];

  constructor(private helperService: HelperServiceService) { }

  ngOnInit() {
    this.roverUpdated = this.helperService.roverUpdated;
    this.helperService.trip(this.roverUpdated, this.orders);
  }

}

