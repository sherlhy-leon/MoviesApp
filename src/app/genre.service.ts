import { Injectable } from '@angular/core';
import { Genre, RequestGenre } from './genre'
import { Movie, RequestMovies } from './movies'
import { HttpClient } from '@angular/common/http';
import { map, flatMap, mergeMap } from 'rxjs/operators';
import { Observable, concat, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(type: string):Observable<Genre[]> {
    return this.http.get<RequestGenre>("https://api.themoviedb.org/3/genre/" + type + "/list?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(mergeMap(response => {
        return this.getActivesGenres(response.genres);
      }));
  }

  getMovies2() {
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results;
      }));
  }

  getActivesGenres(genres: Genre[]): Observable<Genre[]> {
    return this.getMovies2().pipe(
      map((movies: Movie[]) => {
        var actives: Genre[] = [];
        genres.forEach(g => {
          if (movies.some(m => m.genre_ids.some(genreId => genreId == g.id))) {
            actives.push(g);
          }
        })
        return actives;
      }));
  }

}
