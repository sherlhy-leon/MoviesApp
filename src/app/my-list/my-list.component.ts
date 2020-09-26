import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { TvShowsService } from '../tv-shows.service'; 
import { Movie } from '../movies';
import { TvShow } from '../tv-shows';


@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService, private tvshowsService: TvShowsService) { }
  type: string = ""
  favorites = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var selector = params.get('selector');
      if(selector == "movies"){
        this.getFavoritesMovies();
        this.type = "movie";
      }
      else if(selector == "tvshows"){
        this.getFavoritesTvShows();
        this.type = "tvshow";
      }
        
    });
  }

  getFavoritesMovies() {
      this.favorites = this.moviesService.favoritesmovies;
  }

  getFavoritesTvShows() {
    this.favorites = this.tvshowsService.favoritestvshows;
  }

}
