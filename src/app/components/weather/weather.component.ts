import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

// Models
import { OpenWeather } from '../../models/OpenWeather/open-weather';

// Services
import { OpenWeatherService } from '../../services/OpenWeatherService/open-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() city: number | Array < number > ;
  @Output() deleteCity = new EventEmitter < any > ();
  private enableDelete = false;
  private openWeather: OpenWeather;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    if (typeof this.city == "number") {
      this.enableDelete = true;
      this.openWeatherService.getWeatherById(this.city)
      .subscribe(
        (data: OpenWeather) => this.openWeather = data,
        (err) => console.error("Error from service", err),
        () => console.log("Weather", this.openWeather)
      );
    }
    else
      this.openWeatherService.getWeatherByCoordinates(this.city[0], this.city[1])
      .subscribe(
        (data: OpenWeather) => this.openWeather = data,
        (err) => console.error("Error from service", err),
        () => console.log("Weather", this.openWeather)
      );
  }

  delete() {
    this.deleteCity.emit(this.city);
  }
}