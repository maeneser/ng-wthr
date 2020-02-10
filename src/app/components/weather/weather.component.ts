import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

// Models
import { OpenWeather } from '../../models/OpenWeather/open-weather';

// Services
import { OpenWeatherService } from '../../services/OpenWeatherService/open-weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() city: number | Array<number> ;
  @Output() deleteCity = new EventEmitter<any>();
  private openWeather: Observable<OpenWeather>;
  private enableDelete = false;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit() {
    if (typeof this.city == "number") {
      this.enableDelete = true;
      this.openWeather = this.openWeatherService.getWeatherById(this.city);
    }
    else
      this.openWeather = this.openWeatherService.getWeatherByCoordinates(this.city[0], this.city[1]);
  }

  delete() {
    this.deleteCity.emit(this.city);
  }
}