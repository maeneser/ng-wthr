import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

// Models
import { City } from 'src/app/models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private citiesJson = 'assets/city.list.json';
  private cities$ = new Subject < Array < City >> ();

  constructor(private http: HttpClient) {}

  findCity(city: string) {
    let cities = new Array < City > ();
    if (city.length > 3) {
      this.http.get < Array < City >> (this.citiesJson)
        .subscribe(
          (data: Array < City > ) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].name.startsWith(city)) {
                cities.push(data[i]);
              }
            }
            this.cities$.next(cities);
          },
          (err) => console.error("Error from service", err)
        );
    } else this.cities$.next(cities);
  }

  getCities(): Observable < Array < City >> {
    return this.cities$.asObservable();
  }
}