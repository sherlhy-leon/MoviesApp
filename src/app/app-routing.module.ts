import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {TvShowDetailsComponent} from './tv-show-details/tv-show-details.component';

const routes: Routes = [
  {path:"movies", component: MoviesComponent},
  {path:"tv-shows", component:TvShowsComponent},
  {path: "movie/:id", component: MovieDetailsComponent },
  {path: "tvshow/:id", component: TvShowDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
