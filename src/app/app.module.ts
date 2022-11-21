import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationAnimationType, SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SeminarraumComponent } from './components/seminarraum/seminarraum.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SeminarComponent } from './components/seminar/seminar.component';
import { SeminarbuchungComponent } from './components/seminarbuchung/seminarbuchung.component';
import { AnimationMetadataType } from '@angular/animations';
import { KeycloakService } from 'keycloak-angular';

export const appRoutes: Routes = [
  {path:"", component: SeminarComponent}, 
  {path: "about", component: AboutComponent},
  {path: "seminarraum", component: SeminarraumComponent},
  {path: "buchung", component: SeminarbuchungComponent}
]

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/auth',
        realm: 'seminar-management',
        clientId: 'adesso-seminar-management'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    SeminarraumComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SeminarComponent,
    SeminarbuchungComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes, {enableTracing: true}), 
    HttpClientModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(
      {
        position: ['bottom', 'right'],
        animate: NotificationAnimationType.FromLeft,
        showProgressBar: true,
        pauseOnHover:false,
        timeOut:1500
      }
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
