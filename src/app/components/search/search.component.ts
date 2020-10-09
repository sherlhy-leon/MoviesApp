import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  url: string = "";
  query: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private searchService: SearchService ) { }

  ngOnInit(): void {
  }

  GetUrl(){
      this.url = this.router.url;
      console.log("URL:" + this.url);
  }

  sendQuery(){
    this.searchService.search(this.query, this.url);
  }


}
