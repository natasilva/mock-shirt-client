import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private url = environment.api
  constructor(private http: HttpClient) { }

  list(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/colors`);
  }
}
