import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SeminarraumComponent } from './components/seminarraum/seminarraum.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const appRoutes: Routes = [
  {path: "about", component: AboutComponent},
  {path: "seminarraum", component: SeminarraumComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    SeminarraumComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes, {enableTracing: true}), 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
