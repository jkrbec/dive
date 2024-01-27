import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MoviesListComponent,
    StarRatingComponent,
    MovieCarouselComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
