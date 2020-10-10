import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  url: string = "";
  query: string = "";

  constructor(private router: Router, private searchService: SearchService ) { }

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
