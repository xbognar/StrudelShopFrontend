import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { CatalogComponent } from '../../shared/components/catalog/catalog.component';
import { LocationComponent } from '../../shared/components/location/location.component';
import { ConnectComponent } from '../../shared/components/connect/connect.component';
import { ReviewsComponent } from '../../shared/components/reviews/reviews.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [LayoutComponent, HeroComponent, CatalogComponent, LocationComponent, ConnectComponent, ReviewsComponent]
})
export class HomeComponent { }
