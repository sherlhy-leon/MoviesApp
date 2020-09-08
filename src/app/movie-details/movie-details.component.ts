import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie,RequestMovies } from '../movies'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = new Movie();
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMoviebyId(2);
  }

  getMoviebyId(id:number): void {
    this.moviesService.getMoviebyId(id).subscribe((data : Movie) => { this.movie = data});
  }

}
