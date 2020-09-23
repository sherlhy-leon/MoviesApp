import { Injectable } from '@angular/core';
import { Movie, RequestMovies } from './movies'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(selector: string) {
    console.log("getMovieById:", selector);
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/" + selector + "?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getMoviebyId(id: number) {
    return this.http.get<Movie>("https://api.themoviedb.org/3/movie/" + id.toString() + "?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getMoviesByGenres(id: number) {
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results.filter(m => m.genre_ids.find(g => g == id));
      }));
  }

}
