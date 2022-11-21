import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Seminarbuchung } from 'src/app/interfaces/Seminarbuchung';
import { Seminar } from 'src/app/interfaces/Seminar';
import { Person } from 'src/app/interfaces/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public savePerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(`${this.apiUrl}/person/add/`, person);
  }

  public getPersonByUsername(username: String): Observable<Person> {
    return this.httpClient.get<Person>(`${this.apiUrl}/person/getByUsername/${username}`);
  }
  
  public getBuchungenByPersonId(personId: number):  Observable<Seminarbuchung[]>{
    return this.httpClient.get<Seminarbuchung[]>(`${this.apiUrl}/person/buchungen/${personId}`);
  }

  seminarbuchungStornieren(buchungsnummer: string, personId: number): Observable<void> {
    const params: HttpParams = new HttpParams()
    .set("buchungsnummer", buchungsnummer)
    .set("personId", personId);
    return this.httpClient.post<void>(`${this.apiUrl}/person/buchung/stornieren`, params);
  }

  public seminarBuchen(seminarnummer: number, personId: number): Observable<string> {
    const params: HttpParams = new HttpParams()
    .set("seminarnummer", seminarnummer)
    .set("personId", personId);
    return this.httpClient.post<string>(`${this.apiUrl}/person/seminar/buchen`, params);
  }
}
