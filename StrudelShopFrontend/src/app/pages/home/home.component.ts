import { AfterViewInit, Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { LocationComponent } from '../../components/location/location.component';
import { ConnectComponent } from '../../components/connect/connect.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [LayoutComponent, HeroComponent, CatalogComponent, LocationComponent, ConnectComponent, ReviewsComponent],
})
export class HomeComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
