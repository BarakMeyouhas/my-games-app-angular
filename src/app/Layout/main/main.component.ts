import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  toggleDrawer(): void {
    this.showFiller = !this.showFiller;
  }
  showFiller: any;
}
