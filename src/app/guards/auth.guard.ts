import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { KeycloakTokenParsed } from 'keycloak-js';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/Person';
import { PersonService } from '../services/person/person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  public person: Person;
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private personService: PersonService
  ) {
    super(router, keycloak);
  }
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.saveLoggedUser();
    this.getLoggedPerson();
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }

  private saveLoggedUser(): void {
    const userDetails = this.getUserDetails();
    
    this.person = {
      username: userDetails?.['preferred_username'],
      vorname: userDetails?.['given_name'],
      nachname: userDetails?.['family_name']
    }

    this.personService.getPersonByUsername(this.person.username).subscribe({  
      next: (value) => {
        if(!value) {
          this.personService.savePerson(this.person).subscribe({
            next: (value) => {this.person = value}, 
            error: (e: HttpErrorResponse) => {console.log(e.message)}
          })
        }
      },
      error: (error: HttpErrorResponse) => {console.log(error.message);
      }
    });
  }

  public getUserDetails(): KeycloakTokenParsed | undefined{
    try {
      const userDetails = this.keycloak.getKeycloakInstance().tokenParsed;
      return userDetails;
    }
    catch (e) {
      console.error("Exception: ", e);
      return undefined;
    }
  }

  public getUsername(): string {
    const userDetails = this.getUserDetails();
    return userDetails?.['preferred_username'];
  }

  public getLoggedPerson(): Person {
    this.personService.getPersonByUsername(this.getUsername()).subscribe({
      next: (value: Person) => {this.person = value;},
      error: (e: HttpErrorResponse) => {console.log(e.message);
      }
    });
    return this.person;
  }

  public isLogged(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  public getLoggedUser(): Person {
    const userDetails = this.getUserDetails();
    this.person = {
      username: userDetails?.['preferred_username'],
      vorname: userDetails?.['given_name'],
      nachname: userDetails?.['family_name']
    }
    return this.person;
  }
}
