import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from "../environments/environment";

import { TheOrangeAllianceComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AddDataComponent } from './views/add-data/add-data.component';
import { AccountComponent } from './views/account/account.component';
import { EventsComponent } from './views/events/events.component';
import { TeamsComponent } from './views/teams/teams.component';
import { EventComponent } from './views/event/event.component';
import { AboutComponent } from './views/about/about.component';
import { ApiDocsComponent } from './views/apidocs/apidocs.component';

import { FTCDatabase } from './providers/ftc-database';
import { EventRankingsComponent } from './views/event/subviews/event-rankings/event-rankings.component';
import { EventMatchesComponent } from './views/event/subviews/event-matches/event-matches.component';
import { EventTeamsComponent } from './views/event/subviews/event-teams/event-teams.component';
import { EventAwardsComponent } from './views/event/subviews/event-awards/event-awards.component';
import { PageNotFoundComponent } from './views/404/404.component';
import { TeamComponent } from './views/team/team.component';
import { RankingComponent } from './views/ranking/ranking.component';
import { StreamingComponent } from './views/stream/streaming.component';
import { PrivacyTermsComponent } from './views/privacy_terms/PrivacyTerms.component';
import { MatchesComponent } from './views/matches/matches.component';
import { VelocityVortexComponent } from './views/matches/years/1617/1617-velocity-vortex.component';
import { RelicRecoveryComponent } from './views/matches/years/1718/1718-relic-recovery-component';
import { AppMaterialModule } from './material.module';
import { MatchTableComponent } from './components/match-table/match-table.component';
import { EventItemComponent } from './components/event/event.item.component';
import { TeamItemComponent } from './components/team/team.item.component';
import { AwardItemComponent } from './components/award/award.item.component';
import { LoginComponent } from "./views/account/login/login.component";
import { RegisterComponent } from "./views/account/register/register.component";
import { RoverRuckusComponent } from "./views/matches/years/1819/1819-rover-ruckus.component";
import { TeamRobotComponent } from "./views/team/subviews/team-robot/team-robot.component";
import { TeamResultsComponent } from "./views/team/subviews/team-results/team-results.component";

@NgModule({
  declarations: [
    TheOrangeAllianceComponent,
    HomeComponent,
    AddDataComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    TeamsComponent,
    EventComponent,
    AboutComponent,
    TeamComponent,
    EventRankingsComponent,
    EventMatchesComponent,
    EventTeamsComponent,
    EventAwardsComponent,
    TeamRobotComponent,
    TeamResultsComponent,
    PageNotFoundComponent,
    ApiDocsComponent,
    RankingComponent,
    StreamingComponent,
    PrivacyTermsComponent,
    MatchesComponent,
    VelocityVortexComponent,
    RelicRecoveryComponent,
    RoverRuckusComponent,
    TeamRobotComponent,
    MatchTableComponent,
    EventItemComponent,
    TeamItemComponent,
    AwardItemComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'T'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    BrowserModule.withServerTransition({appId: 'TOA-WebApp-1819'}),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [FTCDatabase],
  bootstrap: [TheOrangeAllianceComponent]
})
export class AppModule { }
