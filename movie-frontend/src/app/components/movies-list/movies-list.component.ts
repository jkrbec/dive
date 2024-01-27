import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie, NewMovie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  imports: [FormsModule, CommonModule, StarRatingComponent],
  standalone: true,
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  movies$: Observable<Movie[]>;
  newMovieTitle: string = '';
  newMovieRating: number = 1;
  showModal: boolean = false;
  currentEditingMovieId: number | null = null;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.movies$;
  }

  openAddMovieModal(): void {
    this.showModal = true; // Nastavení showModal na true pro zobrazení modálního okna
  }

  closeAddMovieModal(): void {
    this.showModal = false; // Nastavení showModal na false pro skrytí modálního okna
  }
  addNewMovie(): void {
    // Kontrola, zda je hodnocení v povoleném rozsahu
    if (this.newMovieRating < 1 || this.newMovieRating > 7) {
      alert('Hodnocení musí být v rozsahu od 1 do 7.');
      return; // Zastavení přidávání filmu
    }
    const newMovie: NewMovie = {
      title: this.newMovieTitle,
      rating: this.newMovieRating,
    };
    this.movieService.addMovie(newMovie).subscribe({
      next: () => {
        // Zpracování po přidání filmu
        this.closeAddMovieModal();
        this.newMovieTitle = '';
        this.newMovieRating = 1;
      },
      error: (error) => {
        console.error('Error adding new movie', error);
      },
    });
  }

  updateMovie(): void {
    if (this.currentEditingMovieId === null) {
      console.error('Error: No movie is currently being edited');
      return;
    }
  
    const updatedMovieData: NewMovie = {
      title: this.newMovieTitle,
      rating: this.newMovieRating
    };
  
    this.movieService.updateMovie(this.currentEditingMovieId, updatedMovieData).subscribe({
      next: () => {
        // Zpracování po úspěšné aktualizaci
        this.closeAddMovieModal();
        this.resetForm();
        // Zde můžete přidat další logiku, např. zobrazení zprávy o úspěchu
      },
      error: (error) => {
        console.error('Error updating movie', error);
        // Zde můžete přidat logiku pro zpracování chyby, např. zobrazení chybové zprávy
      }
    });
  }
  
  resetForm(): void {
    this.newMovieTitle = '';
    this.newMovieRating = 1;
    this.currentEditingMovieId = null;
  }
  
  
  
  

  editMovie(movie: Movie): void {
    this.newMovieTitle = movie.title;
    this.newMovieRating = movie.rating;
    this.currentEditingMovieId = movie.id; // Přidáte proměnnou pro sledování upravovaného filmu
    this.showModal = true;
  }

  deleteMovie(movieId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      this.movieService.deleteMovie(movieId).subscribe({
        next: () => {
          // Zde můžete přidat logiku po úspěšném smazání
          console.log('Movie deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting movie', error);
        }
      });
    }
  }
  
  

  ngOnInit(): void {}
  // V MoviesListComponent nebo MovieCarouselComponent

  saveMovie(): void {
    if (this.currentEditingMovieId !== null) {
      this.updateMovie();
    } else {
      this.addNewMovie();
    }
  }
  
onRatingChanged(movie: Movie, newRating: number) {
  const updatedMovieData: NewMovie = {
    title: movie.title,
    rating: newRating
  };

  this.movieService.updateMovie(movie.id, updatedMovieData).subscribe({
    next: () => {
      movie.rating = newRating; // Aktualizujte hodnocení v lokálním stavu
      // Další logika, pokud je třeba
    },
    error: (error) => {
      console.error('Error updating movie rating', error);
    }
  });
}


  // editMovie(movie: Movie): void {
  //   //Otevření dialogu

  //   this.movieService.updateMovie(updatedMovie).subscribe({
  //     next: (response) => {
  //       // Při úspěšné aktualizaci aktualizuje film
  //       movie = updatedMovie;
  //     },
  //     error: (error) => {
  //       console.error('Error updating movie rating', error);
  //     }
  //   })
  // }
}
