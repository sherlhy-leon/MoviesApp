import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TvShowsService } from '../tv-shows.service';
import {TvShow } from '../tv-shows';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  tvshow: TvShow = new TvShow();
  constructor(private route: ActivatedRoute, private router: Router, private tvshowService: TvShowsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = +params.get('id');
      this.getTVShowbyId(id);
    });
  }

  getTVShowbyId(id:number): void {
    this.tvshowService.getTVShowbyId(id).subscribe((data : TvShow) => { this.tvshow = data});
  }

}
