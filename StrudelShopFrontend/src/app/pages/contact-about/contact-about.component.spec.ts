import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAboutComponent } from './contact-about.component';

describe('ContactAboutComponent', () => {
  let component: ContactAboutComponent;
  let fixture: ComponentFixture<ContactAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
