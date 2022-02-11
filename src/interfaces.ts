interface ICinema {
  id: string;
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

interface ICityResponse {
  data: {
    market: IMarket;
    films: IFilm[];
    sessions: ISession[];
  }
}

interface ICity {
  cinemas: ICinema[];
  films: IFilm[];
  sessions: ISession[]
}

export {
  ICinema,
  ICity,
  ICityResponse,
  IFilm,
  IMarket,
  ISession
}
