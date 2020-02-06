import {
  Component,
  OnInit
} from '@angular/core';

// Models
import {
  OpenWeather
} from '../models/OpenWeather/open-weather';

// Services
import {
  OpenWeatherService
} from '../services/OpenWeatherService/open-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private openWeather: OpenWeather;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
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
}