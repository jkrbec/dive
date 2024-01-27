import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie, NewMovie } from '../models/movie';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/api/movies';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.getMovies().subscribe((movies) => {
      this.moviesSubject.next(movies);
    });
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
  addMovie(movie: NewMovie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/`, movie).pipe(
      tap(() => this.loadInitialData()) // Reload data after adding
    );
  }

  updateMovie(movieId: number, movieData: NewMovie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${movieId}/`, movieData).pipe(
      tap(() => {
        this.getMovies().subscribe((movies) => {
          this.moviesSubject.next(movies);
        });
      })
    );
  }

  updateMovieRating(movieId: number, newRating: number): Observable<any> {
    const url = `${this.apiUrl}/${movieId}/`;
    return this.http.put(url, { rating: newRating }).pipe(
      tap(() => this.loadInitialData()) // Reload data after updating rating
    );
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadInitialData()) // Reload data after deletion
    );
  }
}
