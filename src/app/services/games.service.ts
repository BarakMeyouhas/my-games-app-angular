import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private APIKEY = environment.RAWG_API_KEY;
  private gamesURL = `https://api.rawg.io/api/games?key=${this.APIKEY}&dates=2023-01-01,2023-12-31&ordering=-added&page=`;
  private gameDetailsURL = 'https://api.rawg.io/api/games';
  private allGamesURL = `https://api.rawg.io/api/games?key=${this.APIKEY}`;
  private searchGamesURL = 'https://my-games-app-269471bb97e6.herokuapp.com/api/v1/games/searchGames';

  private searchResults: any = [];

  private searchResultsSubject = new Subject<any>();
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.searchResults$ = this.searchResultsSubject.asObservable();
  }

  setSearchResults(searchResults: any): void {
    this.searchResultsSubject.next(searchResults);
  }

  getAllGames(): Observable<any> {
    return this.http.get(`${this.allGamesURL}`);
  }

  get20Games(page: number): Observable<any> {
    return this.http.get(`${this.gamesURL}${page}`);
  }

  getGameDetails(gameId: string): Observable<any> {
    return this.http.get(`${this.gameDetailsURL}/${gameId}?key=${this.APIKEY}`);
  }

  searchGames(gameName: string): Observable<any> {
    const url = `${this.searchGamesURL}/${gameName}?key=${this.APIKEY}`;
    return this.http.get(url);
  }
}
