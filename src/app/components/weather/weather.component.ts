import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

// Models
import { OpenWeather } from '../../models/OpenWeather/open-weather';

// Services
import { OpenWeatherService } from '../../services/OpenWeatherService/open-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [
    trigger('closing', [
      state('open', style({
        opacity: 1
      })),
      state('close', style({
        opacity: 0
      })),
      transition('open=>close', animate('500ms'))
    ]),
  ]
})
export class WeatherComponent implements OnInit {
  @Input() city: number | Array<number> ;
  @Output() deleteCity = new EventEmitter<any>();
  private openWeather: OpenWeather;
  private loaded = false;
  private enableDelete = false;
  private currentState = 'open';

  constructor(private openWeatherService: OpenWeatherService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    if (typeof this.city == "number") {
      this.enableDelete = true;
      this.openWeatherService.getWeatherById(this.city)
        .subscribe(
          (data: OpenWeather) => {
            this.openWeather = data;
            this.loaded = true;
          },
          (err) => {
            this._snackBar.open("Oops, uneable to find city", "Close", {
              duration: 5000
            });
            this.delete();
          }
        );
    }
    else
      this.openWeatherService.getWeatherByCoordinates(this.city[0], this.city[1])
        .subscribe(
          (data: OpenWeather) => {
            this.openWeather = data;
            this.loaded = true;
          },
          (err) => {
            this._snackBar.open("Oops, uneable to find city", "Close", {
              duration: 5000
            });
            this.delete();
          }
        );
  }

  delete() {
    this.currentState = 'close';
    setTimeout(() => {
      this.deleteCity.emit(this.city);
    }, 1000);
  }
}