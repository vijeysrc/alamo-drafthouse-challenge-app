import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const getBaseUrl = (city: String) => '/assets/data/mock.json' // `https://drafthouse.com/s/mother/v1/page/market/main/${city}`

interface ICinema {
  name: string;
}

interface IMarket {
  cinemas: ICinema[]
}

interface IFilm {
  title: string;
  slug: string;
}

interface ISession {
  sessionId: string;
  cinemaId: string;
}

interface ICity {
  market: IMarket;
  films: IFilm[];
  sessions: ISession[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCinemas(city: String = 'austin'): Observable<any> {
    const url = getBaseUrl(city)
    return this.http.get(url).pipe(map((res) => {
      const { data } = res as {data: ICity}
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
