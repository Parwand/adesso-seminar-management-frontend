import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Seminar } from 'src/app/interfaces/Seminar';
import { Seminarraum } from 'src/app/interfaces/Seminarraum';
import { PersonService } from 'src/app/services/person/person.service';
import { SeminarService } from 'src/app/services/seminar/seminar.service';
import { SeminarraumService } from 'src/app/services/seminarraum/seminarraum.service';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.css']
})
export class SeminarComponent implements OnInit {
  public seminars: Seminar[];
  public onToggleSeminar: Seminar = {
    seminarnummer: 0,
    seminarTitle: "string",
    beginn: new Date(),
    ende: new Date(),
    kursinhalt: "string",
    teilnehmeranzahl: 2,
    seminarleiter: "string",
    voraussetzung: "string",
    seminarraum: {raumnummer: 0,  name: "", maximalePersonenanzahl:0, ausstattung: ""}
  }

  public seminarraums: Seminarraum[];

  constructor(private seminarService: SeminarService,
              private seminarraumService: SeminarraumService,
              private personService: PersonService,
              private notificationService: NotificationsService,
              private authGuard: AuthGuard) { }

  ngOnInit(): void {
    this.getAllSeminars();
    this.getAllSeminarraums();
  }

  private getAllSeminars() {
    this.seminarService.getAllSeminars().subscribe(
      {
        next:(value: Seminar[]) => {this.seminars = value;
        },
        error: (e: HttpErrorResponse) => console.log(e.message)
      }
    );
  }

  public onAddSeminar(addForm: NgForm) {
    let seminar: Seminar = addForm.value;
    let seminarraum: Seminarraum = {raumnummer: addForm.value.seminarraum, name: "", maximalePersonenanzahl: 2, ausstattung: ""}
    seminar.seminarraum = seminarraum;
    this.seminarService.addSeminar(seminar).subscribe(
     {
      next: (value: Seminar) => {this.getAllSeminars(); addForm.reset()
      }, 
      error: (e: HttpErrorResponse) => {console.log(e.message);
      }
     }
    );
  }

  public onUpdateSeminar(editeForm: NgForm) {
    let seminar: Seminar = editeForm.value;
    let seminarraum: Seminarraum = {raumnummer: editeForm.value.seminarraum, name: "", maximalePersonenanzahl: 2, ausstattung: ""}
    seminar.seminarraum = seminarraum;
    this.seminarService.updateSeminar(seminar).subscribe(
     {
      next: (value: Seminar) => {this.getAllSeminars(); console.log(value); editeForm.reset()
      }, 
      error: (e: HttpErrorResponse) => {console.log(e.message);
      }
     }
    );
  }

  public onDeleteSeminar(seminarnummer: number | undefined) {
    this.seminarService.deleteSeminar(seminarnummer).subscribe(
      {
        next:(value: void) => {console.log(value); this.getAllSeminars();},
        error: (e: HttpErrorResponse) => console.log(e.message)
      }
    );
  }

  public onSeminarBuchen(seminarnummer: number): void {
    this.personService.getPersonByUsername(this.authGuard.getUsername()).subscribe({
      next: (value) =>{
        let person = value;
        if(person.id !== undefined) {
          this.personService.seminarBuchen(seminarnummer, person.id).subscribe(
            {
              next:(value: string) =>
              {console.log(value); this.getAllSeminars();
                if(value) {this.onSuccess('Seminar wurde gebucht')}
                if(!value) {this.onError('Seminar ist schon gebucht || Keine Plätze')} 
              },
              error: (e: HttpErrorResponse) => console.log(e.message)
            }
          );
        }
      },
      error: (e: HttpErrorResponse) => {console.log(e.message);}
    });
  }

  public onToggleModal(seminar: Seminar) : void {
    this.onToggleSeminar = seminar;
  }

  public getAllSeminarraums() {
    this.seminarraumService.getAllSeminarraums().subscribe(
      {
        next: (value: Seminarraum[]) => {this.seminarraums = value},
        error: (e: HttpErrorResponse) => {console.log(e.message);
        },
      }
    );
  }

  private onSuccess(message: string): void {
    this.notificationService.success('SUCCESS', message)
  }
  private onError(message: string): void {
    this.notificationService.error('ERROR', message)
  }
}
