import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
  }

  public redirectToProfile(): void{
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

}
