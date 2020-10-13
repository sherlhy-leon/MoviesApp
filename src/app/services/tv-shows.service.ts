import { Injectable } from '@angular/core';
import { TvShow ,RequestTVShows } from '../tv-shows';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private root: string = "https://api.themoviedb.org/3/tv/";
  private apiKey: string = "?api_key=cea68b520beecac6718820e4ac576c3a";
  favoritestvshows: TvShow[] = []; 
  constructor(private http: HttpClient) { }

  getTvShows(selector: string) {
    return this.http.get<RequestTVShows>(this.root + selector + this.apiKey)
    .pipe(map(res => {
      return res.results;
    }));
  }

  getTVShowbyId(id: number) {
    return this.http.get<TvShow>(this.root + id.toString() + this.apiKey);
  }

  getTvShowsByGenres(id: number) {
    return this.http.get<RequestTVShows>(this.root + "popular" + this.apiKey)
      .pipe(map(response => {
        return response.results.filter(tv => tv.genre_ids.find(g => g == id));
      }));
  }

  addtoFavorites(tv: TvShow){
    this.favoritestvshows.push(tv);
  }

  removeFromFavorites(tv : TvShow){
    var index = this.favoritestvshows.findIndex(tvs => tvs.id == tv.id);
    this.favoritestvshows = this.favoritestvshows.slice(0,index)
      .concat(this.favoritestvshows.slice(index+1,this.favoritestvshows.length));
  }

}
