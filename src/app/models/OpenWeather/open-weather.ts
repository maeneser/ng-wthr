import { Coord } from './coord';
import { Weather } from './weather';
import { Main } from './main';
import { Wind } from './wind';
import { Clouds } from './clouds';
import { Sys } from './sys';

export interface OpenWeather {
    coord: Coord;
    weather: Array<Weather>;
    base: String;
    main: Main;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: String;
    cod: number;
}