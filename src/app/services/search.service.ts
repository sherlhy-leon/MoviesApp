import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../movies';
import { TvShow } from '../tv-shows';
import { MoviesService } from './movies.service';
import { TvShowsService } from './tv-shows.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private moviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private tvshowsSubject: BehaviorSubject<TvShow[]> = new BehaviorSubject<TvShow[]>([]);
  private favoritesMoviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private favoritesTvShowsSubject: BehaviorSubject<TvShow[]> = new BehaviorSubject<TvShow[]>([]);
  movies: Observable<Movie[]> = this.moviesSubject.asObservable();
  tvshows: Observable<TvShow[]> = this.tvshowsSubject.asObservable();
  favoritesMovies: Observable<Movie[]> = this.favoritesMoviesSubject.asObservable();
  favoritesTvShows: Observable<TvShow[]> = this.favoritesTvShowsSubject.asObservable();
  query: string = "";
  constructor(private moviesService: MoviesService, private tvshowsService: TvShowsService) { }

  search(query: string, type: string, selector: string): void {
    this.query = query;
    switch(type){
      case "movies": {
        if (query.length > 0) 
          this.searchMovies(query, selector);
        else
          this.moviesService.getMovies(selector).subscribe((data: Movie[]) => { this.moviesSubject.next(data) });
        break;
      }
      case "tvshows": {
        if (query.length > 0)
          this.searchTvShows(query, selector);
        else
          this.tvshowsService.getTvShows(selector).subscribe((data: TvShow[]) => { this.tvshowsSubject.next(data) });
        break;
      }
      case "favorites":{
        if (selector == "movies") {
          if (query.length > 0)
            this.searchFavoritesMovies(query);
          else
            this.favoritesMoviesSubject.next(this.moviesService.favoritesmovies);
        }
        else if (selector == "tvshows") {
          if (query.length > 0)
            this.searchFavoritesTvShows(query);
          else
            this.favoritesTvShowsSubject.next(this.tvshowsService.favoritestvshows);
        }
        break;
      }
      default:{
        break;
      }
    }
  }

  private searchMovies(query:string, selector:string){
    this.moviesService.getMovies(selector).subscribe((data: Movie[]) => { 
      this.moviesSubject.next(data.filter(mov => mov.title.includes(query))) });
  }

  private searchTvShows(query: string, selector: string){
    this.tvshowsService.getTvShows(selector).subscribe((data: TvShow[]) => { 
      this.tvshowsSubject.next(data.filter(tv => tv.name.includes(query))) });
  }

  private searchFavoritesMovies(query: string) {
    this.favoritesMoviesSubject.next(this.moviesService.favoritesmovies.filter(mov => mov.title.includes(query)));
  }

  private searchFavoritesTvShows(query: string) {
    this.favoritesTvShowsSubject.next(this.tvshowsService.favoritestvshows.filter(tv => tv.name.includes(query)));
  }

}
