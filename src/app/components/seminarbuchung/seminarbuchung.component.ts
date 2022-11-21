import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Person } from 'src/app/interfaces/Person';
import { Seminarbuchung } from 'src/app/interfaces/Seminarbuchung';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-seminarbuchung',
  templateUrl: './seminarbuchung.component.html',
  styleUrls: ['./seminarbuchung.component.css']
})
export class SeminarbuchungComponent implements OnInit {
  seminarbuchungen: Seminarbuchung[];
  person: Person;
  constructor(private personService: PersonService,
              private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.getBuchungen();
    this.setPerson();
  }

  public getBuchungen(): void {
    this.personService.getPersonByUsername(this.authGuard.getUsername()).subscribe({
      next: (value) =>{
        this.person = value;
        this.personService.getBuchungenByPersonId(this.person.id).subscribe({ 
          next: (value: Seminarbuchung[]) => {this.seminarbuchungen = value; console.log(value);
          }, 
          error: (e: HttpErrorResponse) =>{console.log(e.message);
          }
        });
      }
    });
    
  }
  
  public onSeminarbuchungStornieren(buchungsnummer: string): void {
    this.personService.seminarbuchungStornieren(buchungsnummer, this.person.id).subscribe({
      next: (value: void) => {this.getBuchungen(); console.log(value);
      }, 
      error: (e: HttpErrorResponse) =>{console.log(e.message);
      }
    });  
  }

  public setPerson(): void {
    this.personService.getPersonByUsername(this.authGuard.getUsername()).subscribe({
      next: (value) =>{ this.person = value;
      }
    });
  }



}
