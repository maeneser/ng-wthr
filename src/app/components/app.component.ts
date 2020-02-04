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
        console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        this.openWeatherService.getWeatherByCoordinates(longitude, latitude)
          .subscribe(
            (data: OpenWeather) => this.openWeather = data,
            error => console.log("No support for geolocation")
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
        error => console.error("City doesnt found")
      );
  }
}
