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

  private root: string = "https://api.themoviedb.org/3/";
  private apiKey: string = "?api_key=cea68b520beecac6718820e4ac576c3a";
  constructor(private http: HttpClient) { }

  getGenres(type: string):Observable<Genre[]> {
    return this.http.get<RequestGenre>(this.root + "genre/" + type + "/list" + this.apiKey)
      .pipe(mergeMap(response => {
        if(type=="movie")
          return this.getActivesGenresForMovis(response.genres);
        else
          return this.getActivesGenresForTvShows(response.genres);
      }));
  }

  private getMovies() {
    return this.http.get<RequestMovies>(this.root + "movie/popular" + this.apiKey)
      .pipe(map(response => {
        return response.results;
      }));
  }
  
  private getTvShows() {
    return this.http.get<RequestTVShows>(this.root + "tv/popular" + this.apiKey)
      .pipe(map(response => {
        return response.results;
      }));
  }

  private getActivesGenresForMovis(genres: Genre[]): Observable<Genre[]> {
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

  private getActivesGenresForTvShows(genres: Genre[]): Observable<Genre[]> {
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
