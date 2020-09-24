import { Injectable } from '@angular/core';
import { TvShow ,RequestTVShows } from './tv-shows';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private http: HttpClient) { }

  getTvShows(selector: string) {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/" + selector + "?api_key=cea68b520beecac6718820e4ac576c3a")
    .pipe(map(res => {
      return res.results;
    }));
  }

  getTVShowbyId(id: number) {
    return this.http.get<TvShow>("https://api.themoviedb.org/3/tv/" + id.toString() + "?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getTvShowsByGenres(id: number) {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results.filter(tv => tv.genre_ids.find(g => g == id));
      }));
  }

}
