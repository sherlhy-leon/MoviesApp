import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowsService } from '../../services/tv-shows.service';
import { TvShow } from '../../tv-shows';
import { SearchService } from '../../services/search.service'


@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  tvshows: TvShow[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService, private tvshowsService: TvShowsService) { }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      let selector = params.get('selector');
      let idG = +params.get('idG');
      if(selector)
        this.getTvShows(selector);
      if (idG)
        this.getTvShowsByGenres(idG);
    });
  }
  getTvShows(selector: string): void {
    this.searchService.search(this.searchService.query,"tvshows",selector);
    this.searchService.tvshows.subscribe((data: TvShow[]) => {this.tvshows = data});
  }

  getTvShowsByGenres(idG: number): void {
    this.tvshowsService.getTvShowsByGenres(idG).subscribe((data: TvShow[]) => { this.tvshows = data });
  }
}
