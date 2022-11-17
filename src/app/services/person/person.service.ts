import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Seminarbuchung } from 'src/app/interfaces/Seminarbuchung';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public getBuchungenByPersonId(personId: number):  Observable<Seminarbuchung[]>{
    return this.httpClient.get<Seminarbuchung[]>(`${this.apiUrl}/person/buchungen`);
  }
}
