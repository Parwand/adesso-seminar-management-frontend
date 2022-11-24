import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
      next: (value) => {this.person = value;
      },
      error: (error) => {console.log(error.message);
      },
    }); 
  }

  public editAddress(editeForm: NgForm): void {
    this.person = editeForm.value;
    console.log("Person:::::::::::: " , this.person);
    
    this.personService.savePerson(this.person).subscribe({
      next: (value: Person) => {editeForm.reset();},
      error: (error: HttpErrorResponse) => {console.log(error.message)}
    });
  }

}
