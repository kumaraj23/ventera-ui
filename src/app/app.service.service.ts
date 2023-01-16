import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  //baseUrl = 'http://localhost:8080/';
  baseUrl = environment.apiUrl;
  httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

  getResult(inputType: string,
    inputUnit: string,
    targetUnit: string,
    inputValue: number): Observable<any> {
      return this.http.get<string>(this.baseUrl + inputType + '/' + inputUnit + '/' + inputValue + '/' + targetUnit, {headers: this.httpHeaders});
  }

}
