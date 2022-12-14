import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isLoggedIn: boolean = false;

  constructor(private keycloakService: KeycloakService, 
              private authGuard: AuthGuard,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.setUser();
    if((await this.authGuard.isLogged()).valueOf() === true) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    
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

  public hasRouter(router: string): boolean {
    return this.router.url === router;
  }
}
