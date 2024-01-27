import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import  { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
