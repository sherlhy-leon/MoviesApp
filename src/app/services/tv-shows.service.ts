import { Injectable } from '@angular/core';
import { TvShow ,RequestTVShows } from '../tv-shows';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  tvhows_ontheair: TvShow[] = [];
  populars_tvshows: TvShow[] = [];
  favoritestvshows: TvShow[] = []; 
  constructor(private http: HttpClient) { }

  getTvShows(selector: string) {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/" + selector + "?api_key=cea68b520beecac6718820e4ac576c3a")
    .pipe(map(res => {
      if(selector == "popular")
        this.populars_tvshows = res.results;
      else if(selector == "on_the_air")
        this.tvhows_ontheair = res.results;
      return res.results;
    }));
  }

  getTVShowbyId(id: number) {
    return this.http.get<TvShow>("https://api.themoviedb.org/3/tv/" + id.toString() + "?api_key=cea68b520beecac6718820e4ac576c3a");
  }

  getTvShowsByGenres(id: number) {
    return this.http.get<RequestTVShows>("https://api.themoviedb.org/3/tv/popular?api_key=cea68b520beecac6718820e4ac576c3a")
      .pipe(map(response => {
        return response.results.filter(tv => tv.genre_ids.find(g => g == id));
      }));
  }

  AddtoFavorites(tv: TvShow){
    this.favoritestvshows.push(tv);
  }

  RemovetoFavorites(tv : TvShow){
    console.log("Delete tv: " + tv.name);
    this.favoritestvshows.forEach(e => {
      console.log("TVShows" + e.name);
    });

    var index = this.favoritestvshows.findIndex(tvs => tvs.id == tv.id);
    console.log("Index: " + index.toString())

    this.favoritestvshows = this.favoritestvshows.slice(0,index)
      .concat(this.favoritestvshows.slice(index+1,this.favoritestvshows.length));
      
    this.favoritestvshows.forEach(e => {
      console.log("TVShows" + e.name);
    });
  }

}
