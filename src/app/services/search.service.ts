import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, observable, Observable } from 'rxjs';
import { RequestMovies, Movie } from '../movies';
import { RequestTVShows, TvShow } from '../tv-shows';
import { MoviesService } from './movies.service';
import { TvShowsService } from './tv-shows.service';
import { map } from 'rxjs/operators';

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
        if (query.length > 0) {
          this.searchMovies(query, x[2]);
        }
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

  // searchMovies(query: string, selector: string) {

  //   return forkJoin([this.moviesService.getMovies(selector), this.http.get<RequestMovies>("https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&query=" + query)])
  //     .pipe(map(res => {
  //       console.log(res);
  //       let searchResult = res[1].results;
  //       let movies = res[0];
  //       let aux = searchResult.filter(m => movies.find(mov => mov.id == m.id) != undefined);
  //       console.log(aux);
  //       this.moviesSubject.next(searchResult.filter(m => movies.find(mov => mov.id == m.id)));
  //     }));
  // }

  searchMovies(query:string, selector:string){
    if(selector == "popular" && this.moviesService.populars_movies.length > 0 )
      this.moviesSubject.next(this.moviesService.populars_movies.filter(mov => mov.title.includes(query)));
    else if(selector == "now_playing" && this.moviesService.movies_playing_now.length > 0 )
      this.moviesSubject.next(this.moviesService.movies_playing_now.filter(mov => mov.title.includes(query)));
    else if(selector == "upcoming" && this.moviesService.movies_upcoming.length > 0 )
      this.moviesSubject.next(this.moviesService.movies_upcoming.filter(mov => mov.title.includes(query)));
    else
        this.moviesService.getMovies(selector).subscribe((data: Movie[]) => { 
          this.moviesSubject.next(data.filter(mov => mov.title.includes(query))) });
  }

  // searchTvShows(query: string, selector: string) {
  //   return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/search/tv?api_key=cea68b520beecac6718820e4ac576c3a&query=" + query)
  //     .pipe(map(res => {
  //       if (selector == "popular") {
  //         this.tvshowsSubject.next(res.results.filter(tvshow => this.tvshowsService.populars_tvshows.find(show => show.id = tvshow.id)));
  //       }
  //       else if (selector == "on_the_air") {
  //         this.tvshowsSubject.next(res.results.filter(tvshow => this.tvshowsService.tvhows_ontheair.find(show => show.id = tvshow.id)));
  //       }
  //     }));
  // }

  searchTvShows(query: string, selector: string){
    if(selector == "popular" && this.tvshowsService.populars_tvshows.length > 0)
      this.tvshowsSubject.next(this.tvshowsService.populars_tvshows.filter(tv => tv.name.includes(query)));
    else if(selector == "on_the_air"  && this.tvshowsService.tvhows_ontheair.length > 0)
      this.tvshowsSubject.next(this.tvshowsService.tvhows_ontheair.filter(tv => tv.name.includes(query)));
    else
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
