import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-autocomplete',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('400ms')),
    ]),
  ],
  template: `
    <div class="autocomplete-box" *ngIf="showAutocomplete">
      <ul *ngIf="suggestions.length > 0 && !isInputEmpty" [@fadeInOut]>
        <li
          *ngFor="let suggestion of suggestions"
          (click)="selectSuggestion(suggestion)"
        >
          <img
            class="game-image"
            [src]="suggestion.background_image"
            alt="Game Image"
          />
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        border-radius: 5px;
        width: 30%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        background-color: #02001d;
      }

      li {
        padding: 8px;
        cursor: pointer;
        font-family: 'Alata', sans-serif;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
      }
      .game-image {
        width: 60px;
        height: 40px;
        margin-right: 8px;
        border-radius: 6px;
      }

      li:hover {
        background-color: #1f2122;
      }
      @media (max-width: 2561px) {
        ul {
          margin-left: 2270px;
          width: 279px;
        }
      }

      @media (max-width: 1441px) and (min-width: 1026px) {
        ul {
          margin-left: 1152px;
          width: auto;
        }
      }
      @media (min-width: 1268px) {
        ul {
          margin-left: 850px;
          width: auto;
        }
      }
      @media (max-width: 1025px) and (min-width: 769px) {
        ul {
          margin-left: 728px;
          width: auto;
        }
      }

      @media (min-width: 427px) and (max-width: 768px) {
        ul {
          margin-left: 440px;
          width: auto;
        }
      }
      @media (max-width: 426px) and (min-width: 376px) {
        ul {
          margin-left: 0px;
          width: auto;
          z-index: 2
        }
      }
      @media (max-width: 376px) and (min-width: 321px) {
        ul {
          margin-left: 0px;
          width: auto;
          z-index: 2
        }
      }
      @media (max-width: 321px) and (min-width: 320px) {
        ul {
          margin-left: 0px;
          width: auto;
          z-index: 2
        }
      }
    `,
  ],
})
export class AutocompleteComponent {
  @Input() suggestions: any[] = [];
  @Input() isInputEmpty: boolean = false;
  @Output() suggestionSelected = new EventEmitter<any>();
  showAutocomplete: boolean = true;

  constructor(private router: Router) {}

  ngOnChanges(): void {
    // Reset showAutocomplete to true when input changes
    this.showAutocomplete = true;
  }

  selectSuggestion(suggestion: any): void {
    console.log('Selected suggestion:', suggestion);
    if (suggestion.id) {
      this.router.navigate(['/gameDetails', suggestion.id]);
      this.showAutocomplete = false;
    }
  }
}
