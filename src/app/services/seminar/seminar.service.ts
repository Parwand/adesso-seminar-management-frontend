import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seminar } from 'src/app/interfaces/Seminar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeminarService {
  private apiUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAllSeminars(): Observable<Seminar[]> {
    return this.httpClient.get<Seminar[]>(`${this.apiUrl}/seminar/all`);
  }

  public addSeminar(seminar: Seminar): Observable<Seminar> {
    return this.httpClient.post<Seminar>(`${this.apiUrl}/seminar/add`, seminar);
  }

  public updateSeminar(seminar: Seminar): Observable<Seminar> {
    return this.httpClient.put<Seminar>(`${this.apiUrl}/seminar/update`, seminar);
  }

  public deleteSeminar(seminarnummer: number | undefined): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/seminar/delete/${seminarnummer}`);
  }
}
