import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <main>
      <ng-content></ng-content>
    </main>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [HeaderComponent, FooterComponent]
})
export class LayoutComponent { }
