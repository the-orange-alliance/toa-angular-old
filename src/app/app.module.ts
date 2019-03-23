import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { TheOrangeAllianceComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AddDataComponent } from './views/add-data/add-data.component';
import { ManageEventsComponent } from './views/account/subpages/manage-events/manage-events.component';
import { UsersComponent } from './views/account/subpages/users/users.component';
import { CreateEventComponent } from './views/account/subpages/create-event/create-event.component';
import { CacheComponent } from './views/account/subpages/cache/cache.component';
import { RetrieverComponent } from './views/account/subpages/retriever/retriever.component';
import { AccountComponent } from './views/account/account.component';
import { EventsComponent } from './views/events/events.component';
import { TeamsComponent } from './views/teams/teams.component';
import { EventComponent } from './views/event/event.component';
import { AboutComponent } from './views/about/about.component';
import { ApiDocsComponent } from './views/apidocs/apidocs.component';

import { FTCDatabase } from './providers/ftc-database';
import { CloudFunctions } from './providers/cloud-functions';
import { UploadService } from './providers/imgur';
import { EventForParticipantsComponent } from './views/event/subviews/event-for-participants/event-for-participants.component';
import { EventRankingsComponent } from './views/event/subviews/event-rankings/event-rankings.component';
import { EventAlliancesComponent } from './views/event/subviews/event-alliances/event-alliances.component';
import { EventMatchesComponent } from './views/event/subviews/event-matches/event-matches.component';
import { EventTeamsComponent } from './views/event/subviews/event-teams/event-teams.component';
import { EventAwardsComponent } from './views/event/subviews/event-awards/event-awards.component';
import { EventAdminComponent } from './views/event/subviews/event-admin/event-admin.component';
import { PageNotFoundComponent } from './views/404/404.component';
import { TeamComponent } from './views/team/team.component';
import { StreamingComponent } from './views/stream/streaming.component';
import { PrivacyTermsComponent } from './views/privacy_terms/PrivacyTerms.component';
import { MatchesComponent } from './views/matches/matches.component';
import { AppMaterialModule } from './material.module';
import { DialogText } from './dialogs/text/dialog-text';
import { DialogMatch } from './dialogs/match/dialog-match';
import { MatchDetailsComponent } from './views/matches/details/match-details.component';
import { MatchTableComponent } from './components/match-table/match-table.component';
import { EventItemComponent } from './components/event/event.item.component';
import { ModifiedEventItemComponent } from './components/modified_event/modified-event.item.component';
import { TeamItemComponent } from './components/team/team.item.component';
import { AwardItemComponent } from './components/award/award.item.component';
import { LoginComponent } from './views/account/login/login.component';
import { RegisterComponent } from './views/account/register/register.component';
import { TeamRobotComponent } from './views/team/subviews/team-robot/team-robot.component';
import { TeamResultsComponent } from './views/team/subviews/team-results/team-results.component';
import { StreamItemComponent } from './components/stream-item/stream-item.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import {ModifiedTeamItemComponent} from './components/modified_team/modified-team.item.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    TheOrangeAllianceComponent,
    HomeComponent,
    AddDataComponent,
    ManageEventsComponent,
    UsersComponent,
    CreateEventComponent,
    CacheComponent,
    RetrieverComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    TeamsComponent,
    EventComponent,
    AboutComponent,
    TeamComponent,
    EventForParticipantsComponent,
    EventRankingsComponent,
    EventAlliancesComponent,
    EventMatchesComponent,
    EventTeamsComponent,
    EventAwardsComponent,
    EventAdminComponent,
    TeamRobotComponent,
    TeamResultsComponent,
    StreamItemComponent,
    PageNotFoundComponent,
    ApiDocsComponent,
    StreamingComponent,
    PrivacyTermsComponent,
    MatchDetailsComponent,
    MatchesComponent,
    TeamRobotComponent,
    DialogText,
    DialogMatch,
    MatchTableComponent,
    EventItemComponent,
    ModifiedEventItemComponent,
    ModifiedTeamItemComponent,
    TeamItemComponent,
    AwardItemComponent
  ],
  entryComponents: [
    DialogText,
    DialogMatch
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'T'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

    BrowserModule.withServerTransition({appId: 'TOA-WebApp-1819'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StorageServiceModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [FTCDatabase, CloudFunctions, UploadService],
  bootstrap: [TheOrangeAllianceComponent]
})
export class AppModule { }
