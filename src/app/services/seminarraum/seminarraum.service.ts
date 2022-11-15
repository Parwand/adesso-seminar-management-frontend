import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Seminarraum } from 'src/app/interfaces/Seminarraum';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeminarraumService {
  private apiUrl:string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { } 

  public getAllSeminarraums(): Observable<Seminarraum[]> {
    return this.httpClient.get<Seminarraum[]>(`${this.apiUrl}/seminarraum/all`);
  }

  public addSeminarraum(seminarraum: Seminarraum): Observable<Seminarraum> {
    return this.httpClient.post<Seminarraum>(`${this.apiUrl}/seminarraum/add`, seminarraum);
  }

  public deleteSeminarraum(raumnummer: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/seminarraum/delete/${raumnummer}`);
  }

  public editSeminarraum(seminarraum: Seminarraum): Observable<Seminarraum> {
    return this.httpClient.put<Seminarraum>(`${this.apiUrl}/seminarraum/update`, seminarraum);
  }
}
