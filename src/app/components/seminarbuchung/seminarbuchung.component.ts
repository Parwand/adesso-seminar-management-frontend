import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Seminarbuchung } from 'src/app/interfaces/Seminarbuchung';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-seminarbuchung',
  templateUrl: './seminarbuchung.component.html',
  styleUrls: ['./seminarbuchung.component.css']
})
export class SeminarbuchungComponent implements OnInit {
  seminarbuchungen: Seminarbuchung[];
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getBuchungen();
  }

  public getBuchungen(): void {
    this.personService.getBuchungenByPersonId(1).subscribe({ 
      next: (value: Seminarbuchung[]) => {this.seminarbuchungen = value; console.log(value);
      }, 
      error: (e: HttpErrorResponse) =>{console.log(e.message);
      }
    }
      
    );
  }



}
