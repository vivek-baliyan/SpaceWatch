import { Rover } from './rover';
import { RoverCamera } from './roverCamera';

export interface RoverPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: Date;
  rover: Rover;
  camera: RoverCamera;
}
