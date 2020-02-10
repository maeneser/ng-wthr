import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private cities = new Array < number | Array < number > > ();

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.cities.push([position.coords.latitude, position.coords.longitude]);
      });
    }
  }

  addCity(city: number) {
    this.cities.push(city);
  }

  deleteCity(city: number) {
    let i = this.cities.indexOf(city);
    if(i != -1)
      this.cities.splice(i, 1);
  }
}