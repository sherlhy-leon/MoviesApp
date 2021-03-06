import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../movies'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  isfavorite: boolean = false;
  movie: Movie = new Movie();
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      var favorites = this.getFavoritesMovies();
      if(favorites.find(m=>m.id == id))
        this.isfavorite = true; 
      this.getMoviebyId(id);
    });
  }

  getMoviebyId(id:number): void {
    this.moviesService.getMoviebyId(id).subscribe((data : Movie) => { this.movie = data});
  }

  addtoFavorites(m: Movie){
      this.moviesService.addtoFavorites(m);
      this.isfavorite = true;
  }

  removetoFavorites(m: Movie){
    this.moviesService.removeFromFavorites(m);
    this.isfavorite = false;
  }

  getFavoritesMovies(): Movie[] {
    return this.moviesService.favoritesmovies;
  }

}
