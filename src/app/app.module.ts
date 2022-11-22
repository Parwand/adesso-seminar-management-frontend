import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthGuard } from './guards/auth.guard';
import { PersonComponent } from './components/person/person.component';

export const appRoutes: Routes = [
  {path:"", component: SeminarComponent, canActivate: [AuthGuard]}, 
  {path: "about", component: AboutComponent},
  {path: "seminarraum", component: SeminarraumComponent},
  {path: "buchung", component: SeminarbuchungComponent, canActivate: [AuthGuard]},
  {path: "user", component: PersonComponent, canActivate: [AuthGuard]}
]

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/auth',
        realm: 'seminar-management',
        clientId: 'seminar-management-dev'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
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
    SeminarbuchungComponent,
    PersonComponent
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
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
