import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Person } from 'src/app/interfaces/Person';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public person:Person = {};

  constructor(private keycloakService: KeycloakService,
              private personService: PersonService) {}

  ngOnInit(): void {
    this.getPerson();
  }

  public redirectToProfile(): void{
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  public getPerson(): void {
    this.personService.getPersonByUsername(this.keycloakService.getUsername()).subscribe({
      next: (value) => {this.person = value; console.log("=======:: ", value);
      },
      error: (error) => {console.log(error.message);
      },
    }); 
  }

}
