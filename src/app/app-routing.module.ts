import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { EventsComponent } from './views/events/events.component';
import { TeamComponent } from './views/team/team.component';
import { TeamsComponent } from './views/teams/teams.component';
import { EventComponent } from './views/event/event.component';
import { AboutComponent } from './views/about/about.component';
import { ApiDocsComponent } from './views/apidocs/apidocs.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { StreamingComponent } from './views/stream/streaming.component';
import { TermsComponent } from './views/terms/terms.component';
import { PageNotFoundComponent } from './views/404/404.component';
import { MatchesComponent } from './views/matches/matches.component';
import { EventStreamComponent } from "./views/stream/subviews/event-stream.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'apidocs', component: ApiDocsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'stream', component: StreamingComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'events/:event_key', component: EventComponent },
  { path: 'teams/:team_key', component: TeamComponent },
  { path: 'matches/:match_key', component: MatchesComponent },
  { path: 'stream/:event_key', component: EventStreamComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
