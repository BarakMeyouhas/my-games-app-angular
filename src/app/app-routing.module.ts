import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { GameListByGenreComponent } from './pages/game-list-by-genre/game-list-by-genre.component';

const routes: Routes = [
  { path: '', component: GamesListComponent },
  { path: 'gameDetails/:id', component: GameDetailsComponent },
  { path: 'gameListByGenre/:id', component: GameListByGenreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
