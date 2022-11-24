import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { PigAddComponent } from './pig-add/pig-add.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PigListComponent,
    PigAddComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
