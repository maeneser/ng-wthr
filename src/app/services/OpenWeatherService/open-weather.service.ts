import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, config } from 'rxjs';

// Models
import { OpenWeather } from '../../models/OpenWeather/open-weather';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByName(city: String): Observable<OpenWeather> {
    console.log("From service", city);
    environment.openWeatherApi + '?q=' + city + '&appid=' + environment.openWeatherApiKey
    return this.http.get<OpenWeather>(environment.openWeatherApi + '?q=' + city + '&appid=' + environment.openWeatherApiKey);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<OpenWeather> {
    console.log("From service", "Latitude", lat, "Longitde", lon);
    console.log("URL", environment.openWeatherApi + '?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherApiKey);
    return this.http.get<OpenWeather>(environment.openWeatherApi + '?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherApiKey);
  }
}
