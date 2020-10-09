import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie,RequestMovies } from '../../movies'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  isfavorite: boolean = false;
  movie: Movie = new Movie();
  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

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

  AddtoFavorites(m: Movie){
      this.moviesService.AddtoFavorites(m);
      this.isfavorite = true;
  }

  RemovetoFavorites(m: Movie){
    this.moviesService.RemovetoFavorites(m);
    this.isfavorite = false;
  }

  getFavoritesMovies(): Movie[] {
    return this.moviesService.favoritesmovies;
  }

}
