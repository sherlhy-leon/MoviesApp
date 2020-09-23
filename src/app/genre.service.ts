import { Injectable } from '@angular/core';
import { Genre, RequestGenre} from './genre'
import { Movie , RequestMovies} from './movies'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }
  
  isValidGenre: boolean = true;

  getGenres(type: string) {
    return this.http.get<RequestGenre>("https://api.themoviedb.org/3/genre/" + type + "/list?api_key=cea68b520beecac6718820e4ac576c3a")
    .pipe(map(response => {
          return response.genres.filter(g => this.existMoviesWith(g));
    }));
  }

  existMovies(genre: Genre) {
    console.log("ExistMovies!!!!!!!");
    return this.http.get<RequestMovies>("https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a")
    .pipe(map(response => {
        return response.results.some(m => m.genre_ids.some(g => g == genre.id));
    }));
  }

  existMoviesWith(genre: Genre): boolean {
    console.log("ExistMovieWith!!!!!!!!");
     this.existMovies(genre).subscribe((data : boolean) => {console.log(data)});
     console.log(this.isValidGenre);
     return this.isValidGenre;

  }

}
