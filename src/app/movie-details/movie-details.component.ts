import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie,RequestMovies } from '../movies'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = new Movie();
  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      this.getMoviebyId(id);
    });

  }

  getMoviebyId(id:number): void {
    this.moviesService.getMoviebyId(id).subscribe((data : Movie) => { this.movie = data});
  }

}
