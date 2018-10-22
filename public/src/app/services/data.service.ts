import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '../models/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: HttpHeaders;
  private accessUrl: string = `${environment.serverUrl}/api/data/`;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  getData() {
    return this.http.get<Data[]>(this.accessUrl, { headers: this.headers });
  }
}
