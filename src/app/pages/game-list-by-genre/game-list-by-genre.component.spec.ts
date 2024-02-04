import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListByGenreComponent } from './game-list-by-genre.component';

describe('GameListByGenreComponent', () => {
  let component: GameListByGenreComponent;
  let fixture: ComponentFixture<GameListByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameListByGenreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameListByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
