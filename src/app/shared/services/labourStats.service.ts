import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabourStatsService {

  constructor(private http: HttpClient) { }

  public getLabourStats() {
    return this.http.get(`${environment.apiUrl}/application/labourstats/`);
  }
}
