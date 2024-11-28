import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderStandardComponent } from '../../shared/components/header-standard/header-standard.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-contact-about',
  templateUrl: './contact-about.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, HeaderStandardComponent, FooterComponent],
})
export class ContactAboutComponent { }