import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, NewMovie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css'],
  standalone: true,
  imports: [StarRatingComponent, CommonModule],
})
export class MovieCarouselComponent implements OnInit {
  movies$: Observable<Movie[]>; // Přepnuto na Observable

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movies$; // Přihlášení k reaktivnímu streamu filmů
  }

  ngOnInit(): void {
    // Není potřeba další načítání, protože data jsou spravována pomocí BehaviorSubject ve službě
  }

  onRatingChanged(movie: Movie, newRating: number) {
    const updatedMovieData: NewMovie = {
      title: movie.title,
      rating: newRating,
    };

    this.movieService.updateMovie(movie.id, updatedMovieData).subscribe({
      next: (response) => {
        movie.rating = newRating;
      },
      error: (error) => {
        console.error('Error updating movie rating', error);
      },
    });
  }
}
