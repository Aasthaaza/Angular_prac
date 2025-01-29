import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';

const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'add', component: MovieAddComponent},
  {path: 'edit/:id', component: MovieEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
