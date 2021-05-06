/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { Coordinates, Rover, Square } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  square: Square = {
    width: 250,
    height: 300
  };

  //acceder al observable aqui desde el component home

  initRover: Rover = {
    command: 'A',
    orientation: 'N',
    coordinates: { x: 0, y: 0 },
    successTrip: true
  };

  roverUpdated: Rover = this.initRover;

  constructor() { }

  isInsideSquare(coordinates: Coordinates) {
    const maxWidth = this.square.width;
    const maxHeight = this.square.height;

    return (coordinates.x <= maxWidth && coordinates.y <= maxHeight) && (coordinates.x >= 0 && coordinates.y >= 0)? true :  false;
  }

  changeOrientation(orientation: 'N'|'S'|'E'|'W', command: 'A'|'L'|'R' ): 'N'|'S'|'E'|'W'{
    switch (command) {
      case 'A':
      return orientation = orientation;
      
      case 'L':
        if(orientation === 'N') { 
          orientation = 'W';
        } else if (orientation === 'E') {
          orientation = 'N';
        } else if (orientation === 'W') {
          orientation = 'S';
        } else { orientation = 'E'; };
      return orientation;

      case 'R':
        if(orientation === 'N') { 
          orientation = 'E';
        } else if (orientation === 'E') {
          orientation = 'S';
        } else if (orientation === 'W') {
          orientation = 'N';
        } else { orientation = 'W'; };
      return orientation;
    }
  }

  getNewCoordinateWhereIWantToGo(orientation: 'N'|'S'|'E'|'W', coordinates: Coordinates): Coordinates {
    if(orientation === 'N' || orientation === 'S') {
      coordinates.y = orientation === 'N'? coordinates.y+=1 : coordinates.y-=1;
    } else {
      coordinates.x = orientation === 'E'? coordinates.x+=1 : coordinates.x-=1;
    }
    return coordinates;
  }

  moveRover(rover: Rover, command: 'A'|'L'|'R'): Rover{
    rover.orientation = this.changeOrientation(rover.orientation, command);
    rover.coordinates = this.getNewCoordinateWhereIWantToGo(rover.orientation, rover.coordinates);
    const insideSquare = this.isInsideSquare(rover.coordinates);
    
    console.log(command);
    console.log(`current orientation: ${rover.orientation}`);
    console.log(`current coordinates: (${rover.coordinates.x},${rover.coordinates.y})`);
    console.log(`is inside the square? ${insideSquare}`);
    
    if(insideSquare) { //dentro del cuadrado: moverse
      rover.successTrip = true;
      return rover;

    } else { 
      rover.successTrip = false;
      return rover; 
    }
  }

  async trip(rover: Rover, orders = []) {
  
    //primero tiene que mirar si el rover anterior tiene successTrip = true, si es false, salir del bucle y decir que error :O
    if(rover.successTrip === false) {
      console.log(`SUCCESS: ${rover.successTrip}, ${rover.orientation}, last coordinates before error: ${rover.coordinates}`);
      return this.roverUpdated = rover;
    } else {
      orders.forEach((element,i) => {
        setTimeout(()=>{
          this.moveRover(rover, element);
          console.log(`${rover.successTrip}, ${rover.orientation}, (${rover.coordinates.x},${rover.coordinates.y})`);
        }, i*400);
      });
      
      return this.roverUpdated = rover;
    }

  }
  
}
