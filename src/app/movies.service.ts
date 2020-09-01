import { Injectable } from '@angular/core';
import { Movie, RootObject } from './movies'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies() {
    /*return [{ id: 1, 
      name: "The new mutan"},
    { id: 2,
      name: "Tennet"}];*/
    return this.http.get<RootObject>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a");
  }
}
