import { Component, OnInit, Input } from '@angular/core';
import {Genre} from '../../genre';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  @Input()
  type: string = "";
  genres: Genre[] = [];
  genreId: number|null = null;
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    if(this.type == "movies")
      this.getGenres("movie");
    else if(this.type == "tvshows")
      this.getGenres("tv");
  }

  getGenres(type: string): void {
    this.genreService.getGenres(type).subscribe((data : Genre[]) => { this.genres = data});
  }

  setCurrentGenreId(id: number): void{
    this.genreId=id;
  }

}
