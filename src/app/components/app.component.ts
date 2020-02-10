import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private cities = new Array < number | Array < number > > ();

  ngOnInit() {
    this.cities.push(3521081);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.cities.push([position.coords.latitude, position.coords.longitude]);
      });
    }
  }

  deleteCity(city: number) {
    let i = this.cities.indexOf(city);
    if(i != -1)
      this.cities.splice(i, 1);
  }
}