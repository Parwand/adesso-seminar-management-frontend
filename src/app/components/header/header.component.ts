import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Person } from 'src/app/interfaces/Person';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  person: Person;

  constructor(private keycloakService: KeycloakService, 
              private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.setUser();
  }

  public logout(): void {
    this.keycloakService.logout("http://localhost:4200");
  }

  public setUser(): void {
    this.person = this.authGuard.getLoggedUser();
  }

  public onLogin(): void {
    this.keycloakService.login();
  }
}
