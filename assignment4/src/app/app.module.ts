import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { PigAddComponent } from './pig-add/pig-add.component';
import { PigAddModalComponent } from './pig-add-modal/pig-add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PigListComponent,
    PigAddComponent,
    PigAddModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
