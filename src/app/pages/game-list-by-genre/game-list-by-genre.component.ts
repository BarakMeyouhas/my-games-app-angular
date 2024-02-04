import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-game-list-by-genre',
  templateUrl: './game-list-by-genre.component.html',
  styleUrl: './game-list-by-genre.component.scss',
})
export class GameListByGenreComponent {
  gamesData: any[] = [];
  showEffect: boolean = false;
  page: number = 1;
  public searchResultsArray: any = [];
  genreId: any | null = null;
  genreName: string = '';

  private APIKEY = environment.RAWG_API_KEY;
  private searchGamesByGenresURL = `https://api.rawg.io/api/games?key=${this.APIKEY}&genres=${this.genreId}`;
  private add20GamesByGenreURL = `https://api.rawg.io/api/games?key=${this.APIKEY}&genres=${this.genreId}&ordering=-added&page=`;

  constructor(
    private GamesService: GamesService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.GamesService.searchResults$?.subscribe((searchResultsArray) => {
      this.searchResultsArray = searchResultsArray;
      console.log(this.searchResultsArray);
    });

    this.GamesService.searchResults$.subscribe((searchResults) => {
      this.searchResultsArray = searchResults;
      console.log('Search results from GamesService:', this.searchResultsArray);
      this.updateBasedOnSearch();
    });
  }
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.genreId = params.get('id');
          return this.GamesService.getGameDetails(this.genreId);
        })
      )
      .subscribe(() => {
        if (this.genreId !== null) {
          this.searchGamesByGenresURL = `https://api.rawg.io/api/games?key=${this.APIKEY}&genres=${this.genreId}`;
          this.get20GamesByGenre().subscribe((response) => {
            console.log(response.results);
            this.gamesData = response.results;
          });
        }
      });
  }

  get20GamesByGenre(): Observable<any> {
    return this.http.get(`${this.searchGamesByGenresURL}`);
  }

  updateBasedOnSearch(): void {
    if (this.searchResultsArray.length > 0) {
      this.gamesData = this.searchResultsArray;
      console.log('Updated games', this.gamesData);
    }
  }
  load20MoreGamesByGenre(genreId: string): void {
    this.page++;
    const updatedURL = `${this.add20GamesByGenreURL}${this.page}&genres=${genreId}`;

    this.http.get(updatedURL).subscribe((response: any) => {
      console.log(
        `Fetched games for page ${this.page} and genre ${genreId}:`,
        response.results
      );
      this.gamesData = [...this.gamesData, ...response.results];
      console.log('Updated gamesData:', this.gamesData);
    });
  }
  navigateToGameDetails(gameId: number): void {
    const localStorageKey = `gameDetails_${gameId}`;
    const storedDetails = localStorage.getItem(localStorageKey);

    if (storedDetails) {
      console.log(
        'Game Details from local storage:',
        JSON.parse(storedDetails)
      );
      this.router.navigate(['/gameDetails', gameId]);
    } else {
      this.GamesService
        .getGameDetails(gameId.toString())
        .subscribe((details) => {
          console.log('Game Details from API:', details);
          localStorage.setItem(localStorageKey, JSON.stringify(details));
          this.router.navigate(['/gameDetails', gameId]);
        });
    }
  }
}
