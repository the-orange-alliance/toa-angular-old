import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { EventsComponent } from "./views/events/events.component";
import { TeamComponent } from "./views/team/team.component";
import { TeamsComponent } from "./views/teams/teams.component";
import { EventComponent } from "./views/event/event.component";
import { AboutComponent } from "./views/about/about.component";
import { PageNotFoundComponent } from "./views/404/404.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events/:event_key', component: EventComponent },
  { path: 'teams/:team_key', component: TeamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
