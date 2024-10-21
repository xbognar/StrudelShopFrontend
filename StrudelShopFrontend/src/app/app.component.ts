import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  template: `<app-home></app-home>`,
  standalone: true,
  imports: [HomeComponent]
})
export class AppComponent { }
