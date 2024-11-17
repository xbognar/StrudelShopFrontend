import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../header-home/header-home.component';
import { HeaderStandardComponent } from '../header-standard/header-standard.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule, HeaderHomeComponent, HeaderStandardComponent, FooterComponent] 
})
export class LayoutComponent {
  @Input() isHomePage: boolean = false;
}
