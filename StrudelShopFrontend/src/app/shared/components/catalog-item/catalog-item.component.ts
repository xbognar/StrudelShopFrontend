import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CatalogItemComponent {
  @Input() imageSrc!: string;
  @Input() title!: string;
  @Input() bgColor: string = 'bg-stone-500 bg-opacity-10';
  @Output() itemClick = new EventEmitter<void>();

  onItemClicked(): void {
    this.itemClick.emit();
  }
}
