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
  private cities$ = new Subject<Array<City>>();

  constructor(private http: HttpClient) { }

  findCity(city: string) {
    let cities = new Array<City>();
    this.http.get<Array<City>>(this.citiesJson)
      .subscribe(
        (data: Array<City>) => {
          data.forEach((dataCity: City) => {
            if(dataCity.name.startsWith(city)) cities.push(dataCity);
          });
          this.cities$.next(cities);
        },
        (err) => console.error("Error from service", err)
      );
  }

  getCities(): Observable<Array<City>> {
    return this.cities$.asObservable();
  }
}
