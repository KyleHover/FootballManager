import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { FantasyTeamScoringComponent } from './fantasy-team-scoring/fantasy-team-scoring.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AnalysisComponent } from './analysis/analysis.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fantasy-team-scoring', component: FantasyTeamScoringComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
