import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Models
import { City } from '../models/city';
import { OpenWeather } from '../models/OpenWeather/open-weather';

// Services
import { CitiesService } from '../services/CitiesService/cities.service';
import { OpenWeatherService } from '../services/OpenWeatherService/open-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private cities: Array<City>;
  private openWeather: OpenWeather;
  private citiesSubscription: Subscription;

  constructor(private citiesService: CitiesService, private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    this.citiesSubscription = this.citiesService.getCities()
      .subscribe(
        (data: Array<City>) => {this.cities = data; console.log(this.cities);},
        (err) => console.error("Error", err)
      );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.openWeatherService.getWeatherByCoordinates(latitude, longitude)
          .subscribe(
            (data: OpenWeather) => this.openWeather = data,
            (err) => console.error("Error from service", err),
            () => console.log("Weather", this.openWeather)
          );
      });
    } else {
      console.log("No support for geolocation");
    }
  }

  ngOnDestroy() {
    this.citiesSubscription.unsubscribe();
  }

  getWeather(city: string): void {
    this.citiesService.findCity(city);
  }
}
