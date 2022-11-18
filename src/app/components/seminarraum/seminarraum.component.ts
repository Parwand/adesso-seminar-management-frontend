import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  public onToggleSeminarraum: Seminarraum = {raumnummer: 0,  name: "", maximalePersonenanzahl:0, ausstattung: ""};

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
      (response: Seminarraum) => {this.getAllSeminarraums(); addForm.reset()}
    );
  }

  public deleteSeminarraum(raumnummer: number | undefined) {
    this.seminarraumService.deleteSeminarraum(raumnummer).subscribe(
      (response: void) => {this.getAllSeminarraums();}
    );
  }

  public onEditeSeminarraum(editeForm: NgForm): void {
    this.seminarraumService.editSeminarraum(editeForm.value).subscribe(
      (response: Seminarraum) => {this.getAllSeminarraums();}
    );
  }

  public onToggleModal(seminarraum: Seminarraum): void{
    this.onToggleSeminarraum = seminarraum;
  }

  public onSearchSeminarraum(key: string): void{
    const result: Seminarraum[] = [];
    for(let seminarraum of this.seminarraums) {
      if(seminarraum.name.toLowerCase().indexOf(key.toLowerCase()) != -1 || 
        seminarraum.ausstattung.indexOf(key.toLowerCase()) != -1)
        {
          result.push(seminarraum);
        }
    }

    this.seminarraums = result;
    if(result.length === 0 || !key) {
      this.getAllSeminarraums();
    }
  }
}
