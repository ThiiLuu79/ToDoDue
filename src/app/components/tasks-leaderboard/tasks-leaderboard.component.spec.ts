import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLeaderboardComponent } from './tasks-leaderboard.component';

describe('TasksLeaderboardComponent', () => {
  let component: TasksLeaderboardComponent;
  let fixture: ComponentFixture<TasksLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
