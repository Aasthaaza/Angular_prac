import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../movie.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {
  movieForm: FormGroup;
  constructor(private fb: FormBuilder, private movieService: MovieService, private router: Router){ // form builder
    this.movieForm=this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    })
  }

  addMovie(): void{
    if(this.movieForm.valid){
      this.movieService.createMovie(this.movieForm.value).subscribe(() => {
        this.router.navigate([`/`]);
      })
    }
  }

}
