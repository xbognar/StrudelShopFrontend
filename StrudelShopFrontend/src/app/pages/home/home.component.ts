import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { LocationComponent } from '../../components/location/location.component';
import { ConnectComponent } from '../../components/connect/connect.component';

@Component({
  selector: 'app-home',
  template: `
    <app-layout>
      <app-hero></app-hero>
      <app-catalog></app-catalog>
      <app-location></app-location>
      <app-connect></app-connect>
    </app-layout>
  `,
  standalone: true,
  imports: [LayoutComponent, HeroComponent, CatalogComponent, LocationComponent, ConnectComponent]
})
export class HomeComponent { }
