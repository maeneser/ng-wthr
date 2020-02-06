import { Component, OnInit } from '@angular/core';
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
  private cities: Observable < Array < City >> ;

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.cities = this.citiesService.getCities();
  }

  getCity(city: string): void {
    this.citiesService.findCity(city);
  }
}