import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {TvShowDetailsComponent} from './tv-show-details/tv-show-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path:"movies", component: MoviesComponent},
  {path:"tv-shows", component:TvShowsComponent},
  {path: "movie/:id", component: MovieDetailsComponent },
  {path: "tvshow/:id", component: TvShowDetailsComponent },
  {path: "movies/:selector", component: MoviesComponent },
  {path: "movie/genre/:idG", component: MoviesComponent},
  {path: "tvshows/:selector", component: TvShowsComponent },
  {path: "tvshows/genre/:idG", component: TvShowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
