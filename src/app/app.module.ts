import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { TheOrangeAllianceComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { EventsComponent } from './views/events/events.component';
import { TeamsComponent } from './views/teams/teams.component';
import { EventComponent } from './views/event/event.component';
import { AboutComponent } from './views/about/about.component';
import { ApiDocsComponent } from './views/apidocs/apidocs.component';
import { PrivacyComponent } from './views/privacy/privacy.component';

import { FTCDatabase } from './providers/ftc-database';
import { EventRankingsComponent } from './views/event/subviews/event-rankings/event-rankings.component';
import { EventMatchesComponent } from './views/event/subviews/event-matches/event-matches.component';
import { EventTeamsComponent } from './views/event/subviews/event-teams/event-teams.component';
import { EventAwardsComponent } from './views/event/subviews/event-awards/event-awards.component';
import { PageNotFoundComponent } from './views/404/404.component';
import { TeamComponent } from './views/team/team.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { StreamingComponent } from './views/stream/streaming.component';
import { TermsComponent } from './views/terms/terms.component';
import { MatchesComponent } from './views/matches/matches.component';
import { VelocityVortexComponent } from "./views/matches/years/1617/1617-velocity-vortex.component";
import {RelicRecoveryComponent} from "./views/matches/years/1718/1718-relic-recovery-component";
import {EventStreamComponent} from "./views/stream/subviews/event-stream.component";

@NgModule({
  declarations: [
    TheOrangeAllianceComponent,
    HomeComponent,
    EventsComponent,
    TeamsComponent,
    EventComponent,
    AboutComponent,
    TeamComponent,
    EventRankingsComponent,
    EventMatchesComponent,
    EventTeamsComponent,
    EventAwardsComponent,
    PageNotFoundComponent,
    ApiDocsComponent,
    PrivacyComponent,
    RankingComponent,
    StreamingComponent,
    TermsComponent,
    MatchesComponent,
    EventStreamComponent,
    VelocityVortexComponent,
    RelicRecoveryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'the-orange-alliance'}),
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FTCDatabase],
  bootstrap: [TheOrangeAllianceComponent]
})
export class AppModule { }
