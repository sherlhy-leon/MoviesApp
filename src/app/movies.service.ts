import { Injectable } from '@angular/core';
import { Movie, RequestMovies } from './movies'
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  populars_movies: Movie[] = [];
  movies_playing_now: Movie[] = [];
  movies_upcoming: Movie[] = [];
  favoritesmovies: Movie[] = []; 
  constructor(private http: HttpClient) { }

  getMovies(selector: string) {
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/" + selector + "?api_key=cea68b520beecac6718820e4ac576c3a")
    .pipe(map(res => {
        if(selector == "popular")
          this.populars_movies = res.results;
        else if(selector == "now_playing")
          this.movies_playing_now = res.results;
        else if(selector == "upcoming")
          this.movies_upcoming = res.results;
        return res.results;
    }));
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

  AddtoFavorites(m:Movie){
    this.favoritesmovies.push(m);
  }

  RemovetoFavorites(m:Movie){
    var index = this.favoritesmovies.findIndex(mov => mov.id == m.id);
    this.favoritesmovies = this.favoritesmovies.slice(0,index)
      .concat(this.favoritesmovies.slice(index+1,this.favoritesmovies.length));

  }

}
