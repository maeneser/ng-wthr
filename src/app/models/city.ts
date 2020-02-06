import { Coord } from './General/coord';

export interface City {
  id: number;
  name: string;
  country: string;
  coord: Coord;
}