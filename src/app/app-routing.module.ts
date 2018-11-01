import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { AccountComponent } from './views/account/account.component';
import { EventsComponent } from './views/events/events.component';
import { TeamComponent } from './views/team/team.component';
import { TeamsComponent } from './views/teams/teams.component';
import { EventComponent } from './views/event/event.component';
import { AboutComponent } from './views/about/about.component';
import { ApiDocsComponent } from './views/apidocs/apidocs.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { StreamingComponent } from './views/stream/streaming.component';
import { PrivacyTermsComponent } from './views/privacy_terms/PrivacyTerms.component';
import { PageNotFoundComponent } from './views/404/404.component';
import { MatchesComponent } from './views/matches/matches.component';
import { LiveDocsComponent } from './views/livedocs/livedocs.component';
import { AddDataComponent } from "./views/add-data/add-data.component";
import { LoginComponent } from "./views/account/login/login.component";
import { RegisterComponent } from "./views/account/register/register.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'events', component: EventsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'apidocs', component: ApiDocsComponent },
  { path: 'livedocs', component: LiveDocsComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'stream', component: StreamingComponent },
  { path: 'privacy-terms', component: PrivacyTermsComponent },
  { path: 'events/:event_key', component: EventComponent },
  { path: 'teams/:team_key', component: TeamComponent },
  { path: 'matches/:match_key', component: MatchesComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'terms', redirectTo: '/privacy-terms', pathMatch: 'full' },
  { path: 'privacy', redirectTo: '/privacy-terms', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
