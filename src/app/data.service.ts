import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  ICity,
  ICityResponse
} from '../interfaces'

const getBaseUrl = (city: String) => '/assets/data/mock.json' // `https://drafthouse.com/s/mother/v1/page/market/main/${city}`

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCinemas(city: String = 'austin'): Observable<ICity> {
    const url = getBaseUrl(city)
    return this.http.get(url).pipe(map(res => {
      const { data } = res as ICityResponse
      const { market, films, sessions} = data
      const { cinemas } = market

      return {
        cinemas,
        films,
        sessions
      }
    }))
  }
}
