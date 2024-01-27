export interface Movie {
  id: number;
  title: string;
  rating: number;
  imageUrl?: string; // URL obrázku, který server vrátí po nahrání
}

export interface NewMovie {
  title: string;
  rating: number;
  image?: File; // Soubor obrázku k nahrání
}
