import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../movies'
import { SearchService } from '../../services/search.service'


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var selector = params.get('selector');
      var idG = +params.get('idG');
      if(selector)
        this.getMovies(selector);
      if (idG)
        this.getMoviesByGenres(idG);
    });
  }

  getMovies(selector: string): void {
    this.searchService.search(this.searchService.query,"movies",selector);
    this.searchService.movies.subscribe((data: Movie[]) => {this.movies = data});
  }

  getMoviesByGenres(idG: number): void {
    this.moviesService.getMoviesByGenres(idG).subscribe((data: Movie[]) => { this.movies = data });
  }
}
