import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TvShowsService } from '../tv-shows.service';
import {TvShow } from '../tv-shows';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  isfavorite: boolean = false;
  tvshow: TvShow = new TvShow();
  constructor(private route: ActivatedRoute, private router: Router, private tvshowService: TvShowsService) { }

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

  AddtoFavorites(tv: TvShow){
    this.tvshowService.AddtoFavorites(tv);
    this.isfavorite = true;

  }

  RemovetoFavorites(tv: TvShow){
    console.log("Remove TVShow");
    this.tvshowService.RemovetoFavorites(tv);
    this.isfavorite = false;
  }

  getFavoritesTvshows(): TvShow[] {
    return this.tvshowService.favoritestvshows;
  }
}
