import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from '../components/app.component';
import { SearchComponent } from '../components/search/search.component';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { WeatherComponent } from '../components/weather/weather.component';

// Modules
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SnackBarComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SnackBarComponent]
})
export class AppModule {}