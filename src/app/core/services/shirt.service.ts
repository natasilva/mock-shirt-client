import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShirtService {

  private url = environment.api
  constructor(private http: HttpClient) { }

  processShirt(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/shirt/image-process`, formData);
  }
}
