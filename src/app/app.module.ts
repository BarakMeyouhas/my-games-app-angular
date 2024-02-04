import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './Layout/menu/menu.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { TruncatePipe } from './features/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { AutocompleteService } from './services/autocomplete.service';
import { AutocompleteComponent } from './features/autocomplete/autocomplete.component';
import { GameListByGenreComponent } from './pages/game-list-by-genre/game-list-by-genre.component';
import { NgxGlideModule } from 'ngx-glide';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    GamesListComponent,
    GameDetailsComponent,
    TruncatePipe,
    AutocompleteComponent,
    GameListByGenreComponent,
  ],
  imports: [
    BrowserModule,
    SlickCarouselModule,
    NgxGlideModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSliderModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [AutocompleteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
export class InputClearableExample {
  value = 'Clear me';
}
export class SidenavAutosizeExample {
  showFiller = false;
}
