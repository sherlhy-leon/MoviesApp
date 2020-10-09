import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {TvShowDetailsComponent} from './components/tv-show-details/tv-show-details.component';
import { HomeComponent } from './components/home/home.component';
import { MyListComponent } from './components/my-list/my-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "movie/:id", component: MovieDetailsComponent },
  {path: "tvshow/:id", component: TvShowDetailsComponent },
  {path: "movies/:selector", component: MoviesComponent },
  {path: "movies/genre/:idG", component: MoviesComponent},
  {path: "tvshows/:selector", component: TvShowsComponent },
  {path: "tvshows/genre/:idG", component: TvShowsComponent},
  {path: "favorites/:selector", component: MyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
