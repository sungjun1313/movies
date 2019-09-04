from django.contrib import admin


from .models import Cinema, Review
# Register your models here.

@admin.register(Cinema)
class CinemaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'release',
        'director',
        'actor',
        'created',
        'modified'
    )

    list_display_links = (
        'title',
        'director',
        'actor',
    )

    search_fields = (
        'title',
        'director',
        'actor',
    )


@admin.register(Review)
class CinemaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'cinema',
        'grade',
        'created',
        'modified'
    )

    list_display_links = (
        'user',
        'cinema',
    )

    search_fields = (
        'user',
        'cinema',
    )
