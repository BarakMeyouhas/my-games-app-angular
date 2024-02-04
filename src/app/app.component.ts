import { Router } from '@angular/router';
import { GamesService } from './services/games.service';
import { Component } from '@angular/core';
import { AutocompleteService } from './services/autocomplete.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0})),
      transition('void <=> *', animate('400ms')),
    ]),
  ],
})
export class AppComponent {
  title = 'my-games-app';
  showFiller = true;
  searchValue = '';
  genres: any[] = [];
  showGenres: boolean = false;
  autocompleteSuggestions: any[] = [];
  isInputEmpty: boolean = false;

  public searchResultsArray: any = [];
  constructor(
    private autocompleteService: AutocompleteService,
    private GamesService: GamesService,
    private router: Router,
    private http: HttpClient
  ) {
    this.GamesService.setSearchResults(this.searchResultsArray);
  }

  onSearchInput(): void {
    const input$ = new Observable<string>((observer) => {
      observer.next(this.searchValue);
    });

    if (this.searchValue.trim() === '') {
      this.autocompleteSuggestions = [];
    } else {
      this.autocompleteService
        .getAutocompleteResults(input$)
        .subscribe((suggestions) => {
          this.autocompleteSuggestions = suggestions.results.slice(0, 10);
        });
    }
  }

  searchGame() {
    this.GamesService.searchGames(this.searchValue).subscribe(
      (searchResults) => {
        this.searchResultsArray = searchResults.results;
        console.log('Search results:', this.searchResultsArray);
        this.GamesService.setSearchResults(this.searchResultsArray);
      }
    );
  }

  toggleDrawer(): void {
    this.showFiller = !this.showFiller;
  }
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
  private APIKEY = environment.RAWG_API_KEY;

  toggleGenres(): void {
    const genresURL = `https://api.rawg.io/api/genres?key=${this.APIKEY}`;

    this.http.get(genresURL).subscribe((response: any) => {
      this.genres = response.results;
      console.log('Genres:', this.genres);
    });
    this.showGenres = !this.showGenres;
  }

  navigateToGenre(genreId: string): void {
    this.router.navigate(['/gameListByGenre', genreId]);
  }
}
