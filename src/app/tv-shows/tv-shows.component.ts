import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvShowsService } from '../tv-shows.service';
import { TvShow, RequestTVShows } from '../tv-shows';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  tvshows: TvShow[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private tvshowsService: TvShowsService) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      var selector = params.get('selector');
      var idG = +params.get('idG');
      if(selector)
        this.getTvShows(selector);
      if (idG)
        this.getTvShowsByGenres(idG);
    });
  }
  getTvShows(selector: string): void {
    this.tvshowsService.getTvShows(selector).subscribe((data : TvShow[]) => { this.tvshows = data});
  }

  getTvShowsByGenres(idG: number): void {
    this.tvshowsService.getTvShowsByGenres(idG).subscribe((data: TvShow[]) => { this.tvshows = data });
  }

}
