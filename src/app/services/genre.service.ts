import { Injectable } from '@angular/core';
import { Genre, RequestGenre } from '../genre'
import { Movie, RequestMovies } from '../movies'
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestTVShows, TvShow } from '../tv-shows';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(type: string):Observable<Genre[]> {
    return this.http.get<RequestGenre>("https://api.themoviedb.org/3/genre/" + type + "/list?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(mergeMap(response => {
        if(type=="movie")
          return this.getActivesGenrestoMovis(response.genres);
        else
          return this.getActivesGenrestoTvShows(response.genres);
      }));
  }

  getMovies() {
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results;
      }));
  }
  getTvShows() {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results;
      }));
  }

  getActivesGenrestoMovis(genres: Genre[]): Observable<Genre[]> {
    return this.getMovies().pipe(
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

  getActivesGenrestoTvShows(genres: Genre[]): Observable<Genre[]> {
    return this.getTvShows().pipe(
      map((tvs: TvShow[]) => {
        var actives: Genre[] = [];
        genres.forEach(g => {
          if (tvs.some(tv => tv.genre_ids.some(genreId => genreId == g.id))) {
            actives.push(g);
          }
        })
        return actives;
      }));
  }

}
