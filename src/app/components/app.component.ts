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
    } else {
      console.log("No support for geolocation");
    }
  }
}