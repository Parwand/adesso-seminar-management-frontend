import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Seminarraum } from 'src/app/interfaces/Seminarraum';


@Injectable({
  providedIn: 'root'
})
export class SeminarraumService {
  private apiUrl:string = "http://localhost:8080/seminarraum";

  constructor(private httpClient: HttpClient) { } 

  public getAllSeminarraums(): Observable<Seminarraum[]> {
    return this.httpClient.get<Seminarraum[]>(`${this.apiUrl}/all`);
  }
}
