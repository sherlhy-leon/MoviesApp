import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    TopBarComponent,
    TvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
