import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FTCDatabase } from '../../providers/ftc-database';
import { MatchSorter } from '../../util/match-utils';
import { EventSorter } from '../../util/event-utils';
import { AwardSorter } from '../../util/award-utils';
import { TheOrangeAllianceGlobals } from '../../app.globals';
import Team from '../../models/Team';
import Match from '../../models/Match';
import Season from '../../models/Season';
import Event from '../../models/Event';
import AwardRecipient from '../../models/AwardRecipient';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import Ranking from '../../models/Ranking';
import Media from '../../models/Media';
import TeamSeasonRecord from '../../models/TeamSeasonRecord';
import EventParticipant from '../../models/EventParticipant';

@Component({
  selector: 'toa-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  providers: [FTCDatabase, TheOrangeAllianceGlobals]
})
export class TeamComponent implements OnInit {

  team: Team;
  teamKey: number;
  years: any;
  seasons: Season[];
  currentSeason: Season;
  thisSeason: Season;
  view_type: string;
  wlt: TeamSeasonRecord = null;

  user: any = null;
  favorite: boolean;

  constructor(private ftc: FTCDatabase, private route: ActivatedRoute, private router: Router, private app: TheOrangeAllianceGlobals,
              public db: AngularFireDatabase, public auth: AngularFireAuth) {
    this.teamKey = this.route.snapshot.params['team_key'];

    auth.authState.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = user;
          db.object(`Users/${user.uid}/favTeams/${this.teamKey}`).query.once('value').then(items => {
            this.favorite = items !== null && items.val() === true
          });
      }
    });

    this.select('results');
  }

  public ngOnInit(): void {
    this.years = [];
    this.ftc.getTeamBasic(this.teamKey).then((team: Team) => {
      if (team) {
        this.team = team;
        this.team.media = null;
        this.team.awards = []; // Remove the awards, they arrive later
        for (let i = this.team.rookieYear; i <= new Date().getFullYear(); i++) {
          this.years.push(i);
        }
        this.years.reverse();
        if (this.team.rookieYear >= 0) {
          this.ftc.getAllSeasons().then((data: Season[]) => {
            this.seasons = this.getTeamSeasons(data).reverse();
            this.selectSeason(this.seasons[0]);
            this.thisSeason = this.seasons[0];
          });
        }
        if (this.team.teamNameShort !== null) {
          this.app.setTitle(this.team.teamNameShort + ' (' + this.team.teamKey + ')');
        } else {
          this.app.setTitle('Team ' + this.team.teamKey);
        }
        this.app.setDescription(`Team information and competition results for FIRST Tech Challenge Team #${ this.team.teamKey }`);
      } else {
        this.router.navigate(['/not-found']);
      }
    }, (err) => {
      console.log(err);
      this.router.navigate(['/not-found']);
    })
  }

  public getTeamSeasons(seasons: Season[]): Season[] {
    const year_code = parseInt((this.team.rookieYear + '').toString().substring(2, 4), 10);
    const second_code = year_code + 1;
    let rookie_season_id = '';
    if (year_code < 10) {
      rookie_season_id = '0' + year_code;
    } else {
      rookie_season_id = '' + year_code;
    }
    if (second_code < 10) {
      rookie_season_id += '0' + second_code;
    } else {
      rookie_season_id += '' + second_code;
    }
    for (let i = 0; i < seasons.length; i++) {
      if (rookie_season_id === seasons[i].seasonKey) {
        return seasons.splice(i, seasons.length - 1);
      }
    }
    return seasons;
  }

  public selectSeason(season: any) {
    this.currentSeason = season;
    this.team.events = [];
    this.ftc.getTeamEvents(this.teamKey, this.currentSeason.seasonKey).then((data: EventParticipant[]) => {
      Promise.all(data.map((result: any) => this.ftc.getEventBasic(result.eventKey)))
        .then(events => {
          this.team.events = events;
          this.getEventMatches();
          this.getEventRankings();
          this.getEventAwards();
        });
    }).catch(() => {
      this.team.events = [];
    });
    this.getTeamMedia();
    this.getTeamWLT();
  }

  private getEventMatches() {
    this.team.events = new EventSorter().sort(this.team.events).reverse();
    for (const event of this.team.events) {
      this.ftc.getEventMatches(event.eventKey).then((data: Match[]) => {
        event.matches = data;
        event.matches = this.sortAndFind(event);
      });
    }
  }

  private getEventRankings() {
    this.ftc.getTeamResults(this.teamKey, this.currentSeason.seasonKey).then((data: Ranking[]) => {
      for (const event of this.team.events) {
        for (const ranking of data) {
          if (ranking.eventKey === event.eventKey) {
            event.rankings = [ranking];
          }
        }
      }
    });
  }

  private getEventAwards() {
    this.ftc.getTeamAwards(this.teamKey, this.currentSeason.seasonKey).then((data: AwardRecipient[]) => {
      this.team.awards = data;
      for (const event of this.team.events) {
        let awards = [];
        for (const award of data) {
          if (event.eventKey === award.eventKey) {
            awards.push(award);
          }
        }
        if (awards) {
          awards = new AwardSorter().sort(awards);
        }
        event.awards = awards;
      }
    });
  }

  private getTeamMedia() {
    this.select('results');
    this.team.media = null;
    this.ftc.getTeamMedia(this.teamKey, this.currentSeason.seasonKey).then((data: Media[]) => {
      this.team.media = data;
    });
  }

  private getTeamWLT() {
    this.wlt = null;
    this.ftc.getTeamWLT(this.teamKey, this.currentSeason.seasonKey).then((wlt: TeamSeasonRecord) => {
      if (wlt) {
        this.wlt = wlt;
      }
    });
  }

  private sortAndFind(event: Event): Match[] {
    let teamMatches = [];
    for (const match of event.matches) {
      for (const team of match.participants) {
        if (team.teamKey === this.teamKey) {
          teamMatches.push(match);
        }
      }
    }

    const sorter = new MatchSorter();
    teamMatches = sorter.sort(teamMatches, 0, teamMatches.length - 1);
    return teamMatches;
  }

  openMatchDetails(match_data: any) {
    this.router.navigate(['/matches', match_data.match_key]);
  }

  getSeasonString(seasonKey: string, description: boolean) {
    const code_one = seasonKey.toString().substring(0, 2);
    const code_two = seasonKey.toString().substring(2, 4);

    if (this.seasons) {
      for (const season of this.seasons) {
        if (season.seasonKey === seasonKey) {
          return '20' + code_one + '/' + code_two + (description && season.description ? ' - ' + season.description : '');
        }
      }
    }
    return '20' + code_one + '/' + code_two;
  }

  beautifulURL(website: string) {
    website = website.substr( website.indexOf(':') + 3 ); // Taking off the http/s
    if (website.endsWith('/') || website.endsWith('?') || website.endsWith('#')) { // Taking off unnecessary chars
      website = website.substr( 0, website.length - 1 );
    }

    return website.startsWith('www.') ? website.substring(4, website.length) : website;
  }

  scrollToEvent(id: string) {
    const element = document.getElementById(id);
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top - 85
    });
  }

  toggleTeam(): void {
    if (this.favorite) { // Remove from favorites
      this.db.object(`Users/${this.user.uid}/favTeams/${this.teamKey}`).remove();
      this.db.object(`Users/${this.user.uid}/favTeams/${this.teamKey}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    } else { // Add to favorites
      this.db.object(`Users/${this.user.uid}/favTeams/${this.teamKey}`).set(true);
      this.db.object(`Users/${this.user.uid}/favTeams/${this.teamKey}`).query.once('value').then(items => {
        this.favorite = items !== null && items.val() === true
        });
    }
  }

  public select(view_type) {
    this.view_type = view_type;
  }

  public isSelected(view_type): boolean {
    return this.view_type === view_type;
  }

  sendAnalytic(category, action): void {
    (<any>window).ga('send', 'event', {
      eventCategory: category,
      eventLabel: this.router.url,
      eventAction: action,
      eventValue: 10
    });
  }
}
