import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  readonly MAX_STARS = 7;
  onClick(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating); // Emituje číslo
  }

  get stars(): boolean[] {
    return Array.from({ length: this.MAX_STARS }, (_, i) => i < this.rating);
  }
}
