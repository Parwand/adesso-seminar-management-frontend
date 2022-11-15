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

public sortTable(): void {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("seminarraumTable") as HTMLTableElement ;
  
  switching = true;

  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table?.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      // Get the two elements you want to compare,
      // one from current row and one from the next:
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      // If a switch has been marked, make the switch
      // and mark that a switch has been done:
      rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  console.log(table);
  
}
}
