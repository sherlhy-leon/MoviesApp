import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie,RequestMovies } from '../movies'


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = new Array<Movie>();
  constructor(private route: ActivatedRoute, private router: Router,private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var selector = params.get('selector');
      var idG = +params.get('idG');
      this.getMovies(selector);
      if(idG)
        this.getMoviesByGenres(idG);
    });
  }

  getMovies(selector: string): void {
    this.moviesService.getMovies(selector).subscribe((data : RequestMovies) => { this.movies = data.results});
  }

  getMoviesByGenres(idG: number): void {
    this.moviesService.getMoviesByGenres(idG).subscribe((data : Movie[]) => {this.movies = data});
  }

}
