import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit{
  movieForm: FormGroup;
  movieId: any;

  constructor(private fb: FormBuilder, private movieService: MovieService, private ar: ActivatedRoute, private router: Router){
    this.movieForm=this.fb.group({
          title: ['', Validators.required],
          director: ['', Validators.required],
          year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
        });
  }

  ngOnInit(): void {
    this.movieId = this.ar.snapshot.paramMap.get('id');
    this.movieService.getMovieById(this.movieId).subscribe((movie) => {
      this.movieForm.patchValue(movie);
    })
  }
  updateMovie(): void{
    if(this.movieForm.valid){
      this.movieService.updateMovie({...this.movieForm.value, id : this.movieId}).subscribe(() => {
        this.router.navigate(['/']);
      })
    }
  }
}
