from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=100)
    rating = models.FloatField()
    image = models.ImageField(upload_to="movie_images/", blank=True, null=True)

    def __str__(self) -> str:
        return self.title