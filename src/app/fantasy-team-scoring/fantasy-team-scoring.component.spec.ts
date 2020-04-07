import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyTeamScoringComponent } from './fantasy-team-scoring.component';

describe('FantasyTeamScoringComponent', () => {
  let component: FantasyTeamScoringComponent;
  let fixture: ComponentFixture<FantasyTeamScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyTeamScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyTeamScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
