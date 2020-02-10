import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import { City } from '../../models/city';

// Services
import { CitiesService } from '../../services/CitiesService/cities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() selectedCity = new EventEmitter<number>();
  private cities: Observable < Array < City >> ;

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.cities = this.citiesService.getCities();
  }

  getCity(city: string) {
    this.citiesService.findCity(city);
  }

  selectCity(city: number) {
    this.selectedCity.emit(city);
  }
}