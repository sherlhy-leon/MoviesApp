import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';
import { GenreComponent } from './components/genre/genre.component';
import { HomeComponent } from './components/home/home.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    TopBarComponent,
    TvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    GenreComponent,
    HomeComponent,
    MyListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
