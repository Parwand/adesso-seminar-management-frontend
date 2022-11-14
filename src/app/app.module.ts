import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SeminarraumComponent } from './components/seminarraum/seminarraum.component';

@NgModule({
  declarations: [
    AppComponent,
    SeminarraumComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
