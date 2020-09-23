import { Component, OnInit } from '@angular/core';
import {Genre} from '../genre';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  genres: Genre[] = [];
  genreId: number|null = null;
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.getGenres("movie");
  }

  getGenres(type: string): void {
    this.genreService.getGenres(type).subscribe((data : Genre[]) => { this.genres = data});
  }

  setCurrentGenreId(id: number): void{
    this.genreId=id;
  }

}
