import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  url: string = "";
  query: string = "";
  type: string = "";
  selector: string = "";
  constructor(private router: Router, private searchService: SearchService ) { }

  getUrl(){
    this.url = this.router.url;
    var s = this.url.split('/');
    if(s.length == 3){
      this.type = s[1];
      this.selector = s[2];
    }
  }

  sendQuery(){
    this.searchService.search(this.query, this.type, this.selector);
  }
}
