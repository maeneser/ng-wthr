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
  title = 'ng-wthr';
  openWeather: OpenWeather;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    this.showExample();
  }

  showExample() {
    this.openWeatherService.getExample()
      .subscribe(
        (data: OpenWeather) => this.openWeather = data,
        error => console.error("Error")
      );
  }

  printExample() {
    console.log(this.openWeather);
  }
}
