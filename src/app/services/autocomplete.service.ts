import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private APIKEY = environment.RAWG_API_KEY;
  private autocompleteURL = 'https://my-games-app-269471bb97e6.herokuapp.com/api/v1/games/searchGames';

  constructor(private http: HttpClient) {}

  getAutocompleteResults(input$: Observable<string>): Observable<any> {
    return input$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((input) => this.fetchAutocompleteResults(input))
    );
  }

  private fetchAutocompleteResults(input: string): Observable<any> {
    const url = `${this.autocompleteURL}/${input}?key=${this.APIKEY}`;
    return this.http.get(url);
  }
}
