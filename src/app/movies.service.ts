import { Injectable } from '@angular/core';
import { Movie, RequestMovies } from './movies'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getMoviebyId(id: number) {
    return this.http.get<Movie>("https://api.themoviedb.org/3/movie/673174?api_key=cea68b520beecac6718820e4ac576c3a");

  }

}
