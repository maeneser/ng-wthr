import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private cities = new Array <number | Array<number>>();

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.cities.push([position.coords.latitude, position.coords.longitude]);
      });
    }
  }

  addCity(city: number) {
    let i = this.cities.indexOf(city);
    if (i == -1)
      this.cities.push(city);
    else
      this._snackBar.open("City already showed", "Close", {
        duration: 5000
      });
  }

  deleteCity(city: number) {
    let i = this.cities.indexOf(city);
    if(i != -1)
      this.cities.splice(i, 1);
  }
}