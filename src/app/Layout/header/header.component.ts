import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggleDrawer(): void {
    this.showFiller = !this.showFiller;
  }
  showFiller: any;
}
