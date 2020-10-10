import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../movies';
import { TvShow } from '../tv-shows';
import { MoviesService } from './movies.service';
import { TvShowsService } from './tv-shows.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  moviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  tvshowsSubject: BehaviorSubject<TvShow[]> = new BehaviorSubject<TvShow[]>([]);
  favoritesMoviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  favoritesTvShowsSubject: BehaviorSubject<TvShow[]> = new BehaviorSubject<TvShow[]>([]);
  movies: Observable<Movie[]> = this.moviesSubject.asObservable();
  tvshows: Observable<TvShow[]> = this.tvshowsSubject.asObservable();
  favoritesMovies: Observable<Movie[]> = this.favoritesMoviesSubject.asObservable();
  favoritesTvShows: Observable<TvShow[]> = this.favoritesTvShowsSubject.asObservable();
  query: string = "";
  constructor(private http: HttpClient, private moviesService: MoviesService, private tvshowsService: TvShowsService) { }

  search(query: string, url: string): void {
    this.query = query;
    var x = url.split('/');
    if (x.length == 3) {
      if (x[1] == "movies") {
        if (query.length > 0) 
          this.searchMovies(query, x[2]);
        else
          this.moviesService.getMovies(x[2]).subscribe((data: Movie[]) => { this.moviesSubject.next(data) });
      }
      else if (x[1] == "tvshows") {
        if (query.length > 0)
          this.searchTvShows(query, x[2]);
        else
          this.tvshowsService.getTvShows(x[2]).subscribe((data: TvShow[]) => { this.tvshowsSubject.next(data) });
      }
      else if (x[1] == "favorites") {
        if (x[2] == "movies") {
          if (query.length > 0)
            this.searchFavoritesMovies(query);
          else
            this.favoritesMoviesSubject.next(this.moviesService.favoritesmovies);
        }
        else if (x[2] == "tvshows") {
          if (query.length > 0)
            this.searchFavoritesTvShows(query);
          else
            this.favoritesTvShowsSubject.next(this.tvshowsService.favoritestvshows);
        }
      }
    }
  }

  searchMovies(query:string, selector:string){
    this.moviesService.getMovies(selector).subscribe((data: Movie[]) => { 
      this.moviesSubject.next(data.filter(mov => mov.title.includes(query))) });
  }

  searchTvShows(query: string, selector: string){
    this.tvshowsService.getTvShows(selector).subscribe((data: TvShow[]) => { 
        this.tvshowsSubject.next(data.filter(tv => tv.name.includes(query))) });
  }

  searchFavoritesMovies(query: string) {
    this.favoritesMoviesSubject.next(this.moviesService.favoritesmovies.filter(mov => mov.title.includes(query)));
  }

  searchFavoritesTvShows(query: string) {
    this.favoritesTvShowsSubject.next(this.tvshowsService.favoritestvshows.filter(tv => tv.name.includes(query)));
  }

}
