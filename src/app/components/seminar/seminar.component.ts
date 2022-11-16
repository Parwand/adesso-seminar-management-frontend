import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Seminar } from 'src/app/interfaces/Seminar';
import { Seminarraum } from 'src/app/interfaces/Seminarraum';
import { SeminarService } from 'src/app/services/seminar/seminar.service';

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

  constructor(private seminarService: SeminarService) { }

  ngOnInit(): void {
    this.getAllSeminars();
  }

  private getAllSeminars() {
    this.seminarService.getAllSeminars().subscribe(
      {
        next:(value: Seminar[]) => this.seminars = value,
        error: (e: HttpErrorResponse) => console.log(e.message)
      }
    );
  }

  public onAddSeminar(addForm: NgForm) {
    this.seminarService.addSeminar(addForm.value).subscribe(
     {
      next: (value: Seminar) => {this.getAllSeminars(); console.log(value);
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

  public onToggleModal(seminar: Seminar) : void {
    this.onToggleSeminar = seminar;
  }
}
