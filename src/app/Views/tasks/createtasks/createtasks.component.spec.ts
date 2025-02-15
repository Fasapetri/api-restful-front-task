import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksComponent } from './createtasks.component';

describe('CreateTasksComponent', () => {
  let component: CreateTasksComponent;
  let fixture: ComponentFixture<CreateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
