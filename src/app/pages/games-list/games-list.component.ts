import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  gamesData: any[] = [];
  showEffect: boolean = false;
  page: number = 1;
  localStorageKey: string = 'allGames';
  public searchResultsArray: any = [];

  constructor(private GamesService: GamesService, private router: Router) {

    this.GamesService.searchResults$?.subscribe((searchResultsArray) => {
      this.searchResultsArray = searchResultsArray;
      console.log(this.searchResultsArray);
    });


    // Subscribe to searchResults$ to update searchResultsArray
    this.GamesService.searchResults$.subscribe((searchResults) => {
      this.searchResultsArray = searchResults;
      console.log('Search results from GamesService:', this.searchResultsArray);
      this.updateBasedOnSearch();
    });
    
  }
  updateBasedOnSearch(): void {
    if (this.searchResultsArray.length > 0) {
      this.gamesData = this.searchResultsArray;
      console.log('Updated games', this.gamesData);
    }
  }

  ngOnInit(): void {
    this.loadGames();
    this.loadAllGames();
    this.updateBasedOnSearch();
  }

  loadAllGames(): void {
    this.GamesService.getAllGames().subscribe((games) => {
      this.gamesData = [...this.gamesData, ...games.results];
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.gamesData)
      );

      console.log(this.gamesData);
    });
  }

  loadGames(): void {
    console.log('Making an API call to get Games');
    this.GamesService.get20Games(this.page).subscribe((results) => {
      this.gamesData = [...this.gamesData, ...results.results];
      this.page++;

      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.gamesData)
      );

      console.log(this.gamesData);
    });
  }

  loadMoreGames(): void {
    this.page++;
    this.loadGames();
  }

  gameDetailsById(gameId: string): void {
    this.GamesService.getGameDetails(gameId).subscribe((details) => {
      console.log('Game Details:', details);
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
