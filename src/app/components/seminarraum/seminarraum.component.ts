import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Seminarraum } from 'src/app/interfaces/Seminarraum';
import { SeminarraumService } from 'src/app/services/seminarraum/seminarraum.service';

@Component({
  selector: 'app-seminarraum',
  templateUrl: './seminarraum.component.html',
  styleUrls: ['./seminarraum.component.css']
})
export class SeminarraumComponent implements OnInit {
  public seminarraums: Seminarraum[];

  constructor(private seminarraumService: SeminarraumService) { }

  ngOnInit(): void {
    this.getAllSeminarraums();
  }

  public getAllSeminarraums() {
    this.seminarraumService.getAllSeminarraums().subscribe(
      (response: Seminarraum[]) => {this.seminarraums = response}
    );
  }

  public addSeminarraum(addForm: NgForm) {
    this.seminarraumService.addSeminarraum(addForm.value).subscribe(
      (response: Seminarraum) => {this.getAllSeminarraums();}
    );
  }

}
