import { Injectable } from '@angular/core';
import { TvShow ,RequestTVShows } from './tv-shows';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private http: HttpClient) { }

  getTvShows() {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/popular?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getTVShowbyId(id: number) {
    return this.http.get<TvShow>("https://api.themoviedb.org/3/tv/" + id.toString() + "?api_key=cea68b520beecac6718820e4ac576c3a");
  }

}
