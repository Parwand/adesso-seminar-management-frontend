import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Seminar } from 'src/app/interfaces/Seminar';
import { SeminarService } from 'src/app/services/seminar/seminar.service';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.css']
})
export class SeminarComponent implements OnInit {
  public seminars: Seminar[];

  constructor(private seminarService: SeminarService) { }

  ngOnInit(): void {
    this.getAllSeminars();
  }

  getAllSeminars() {
    this.seminarService.getAllSeminars().subscribe(
      {
        next:(value: Seminar[]) => this.seminars = value,
        error: (e: HttpErrorResponse) => console.log(e.message)
      }
    );
  }

}
