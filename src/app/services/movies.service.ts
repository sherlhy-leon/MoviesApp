import { Injectable } from '@angular/core';
import { Movie, RequestMovies } from '../movies'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  root: string = "https://api.themoviedb.org/3/movie/";
  api_key: string = "?api_key=cea68b520beecac6718820e4ac576c3a";
  favoritesmovies: Movie[] = []; 
  constructor(private http: HttpClient) { }

  getMovies(selector: string) {
    return this.http.get<RequestMovies>(this.root + selector + this.api_key)
    .pipe(map(res => {
        return res.results;
    }));
  }

  getMoviebyId(id: number) {
    return this.http.get<Movie>(this.root + id.toString() + this.api_key);
  }

  getMoviesByGenres(id: number) {
    return this.http.get<RequestMovies>(this.root + "popular" + this.api_key)
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
