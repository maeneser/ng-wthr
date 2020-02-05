import { Component, OnInit } from '@angular/core';

// Models
import { OpenWeather } from '../models/OpenWeather/open-weather';

// Services
import { OpenWeatherService } from '../services/OpenWeatherService/open-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openWeather: OpenWeather;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Position", position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
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

  getWeather(city: String): void {
    this.openWeatherService.getWeatherByName(city)
      .subscribe(
        (data: OpenWeather) => this.openWeather = data,
        () => console.warn("404"),
        () => console.log("Weather", this.openWeather)
      );
  }
}
