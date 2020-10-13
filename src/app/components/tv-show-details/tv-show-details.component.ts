import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TvShowsService } from '../../services/tv-shows.service';
import {TvShow } from '../../tv-shows';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  isfavorite: boolean = false;
  tvshow: TvShow = new TvShow();
  constructor(private route: ActivatedRoute, private tvshowService: TvShowsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      var favorites = this.getFavoritesTvshows();
      if(favorites.find(tv => tv.id == id))
        this.isfavorite = true; 
      this.getTVShowbyId(id);
    });
  }

  getTVShowbyId(id:number): void {
    this.tvshowService.getTVShowbyId(id).subscribe((data : TvShow) => { this.tvshow = data});
  }

  addtoFavorites(tv: TvShow){
    this.tvshowService.addtoFavorites(tv);
    this.isfavorite = true;
  }

  removetoFavorites(tv: TvShow){
    this.tvshowService.removeFromFavorites(tv);
    this.isfavorite = false;
  }

  getFavoritesTvshows(): TvShow[] {
    return this.tvshowService.favoritestvshows;
  }
}
