import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  movies: any =[];
  filteredMovies: any = [];
  searchText:string='';
  sortBy:string ='title';
  isAscending: boolean = true;


  constructor (private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filteredMovies=[...this.movies];
    });
  }

  filterMovies(): void {
    if(this.searchText){
      this.filteredMovies=this.movies.filter((movie : any) =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      movie.director.toLowerCase().includes(this.searchText.toLowerCase())
    );
    } else {
      this.filteredMovies=[...this.movies];
    }
    this.sortMovies();
  }

  sortMovies(): void {
    this.filteredMovies.sort((a: any, b: any) => {
      if(a[this.sortBy] < b[this.sortBy]){
        return this.isAscending ?-1:1;
      } else if (a[this.sortBy] > b[this.sortBy]) {
        return this.isAscending ? 1:-1;
      }
      return 0;
    });
  }

  toggleSortOrder(): void{
    this.isAscending =!this.isAscending;
    this.sortMovies();
  }

  deleteMovie(id: number): void{
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter((movie: any) => movie.id !== id);
    }
    );
  }

  editMovie(id: number): void{
    this.router.navigate([`/edit/${id}`]);
  }
}
