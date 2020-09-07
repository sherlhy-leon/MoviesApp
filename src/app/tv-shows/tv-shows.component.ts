import { Component, OnInit } from '@angular/core';
import { TvShowsService } from '../tv-shows.service';
import { TvShow, RequestTVShows } from '../tv-shows';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  tvshows: TvShow[] = [];
  constructor(private tvshowsService: TvShowsService) { }

  ngOnInit(): void {
    this.getTvShows();
  }
  getTvShows(): void {
    this.tvshowsService.getTvShows().subscribe((data : RequestTVShows) => { this.tvshows = data.results});
  }

}
