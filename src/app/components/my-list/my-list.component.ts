import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { TvShowsService } from '../../services/tv-shows.service'; 
import { Movie } from '../../movies';
import { TvShow } from '../../tv-shows';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private searchService: SearchService, private moviesService: MoviesService, private tvshowsService: TvShowsService) { }
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
    this.searchService.search(this.searchService.query,"/favorites/movies");
    this.searchService.favoritesMovies.subscribe((data: Movie[]) => {this.favorites = data});

  }

  getFavoritesTvShows() {
    this.searchService.search(this.searchService.query,"/favorites/tvshows");
    this.searchService.favoritesTvShows.subscribe((data: TvShow[]) => {this.favorites = data});
  }

}
