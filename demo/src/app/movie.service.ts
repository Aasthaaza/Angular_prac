import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie{
  id: number;
  title: string;
  director: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = "https://laughing-broccoli-5w9rgvwpqqhvjrr-3000.app.github.dev/movies" // private apiUrl = environment.apiUrl //yeh backend ka url hai

  constructor(private http: HttpClient) {} // Conctsructor DI kiya jismein HttpClient ka object banaya http (private) like Autowired

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie>{
    return this.http.get<Movie>(this.apiUrl + `/${id}`)
  }
  // getMovieByTitle(title: string): Observable<Movie>{
  //   return this.http.get<Movie>(this.apiUrl + `/${title}`);
  // }

  createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(this.apiUrl+ `/${movie.id}`, movie);
  }

  deleteMovie(id: number): Observable<void>{
    return this.http.delete<void>(this.apiUrl+`${id}`);
  }

}















