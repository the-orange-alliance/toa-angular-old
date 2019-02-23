import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MdcCheckbox, MdcSnackbar, MdcTextField } from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { AppBarService } from '../../../../app-bar.service';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { FTCDatabase} from '../../../../providers/ftc-database';
import Season from '../../../../models/Season';
import EventType from '../../../../models/EventType';
import Region from '../../../../models/Region';
import Event from '../../../../models/Event';
import User from '../../../../models/User';
import {Router} from "@angular/router";

@Component({
  selector: 'toa-account-create-event',
  templateUrl: './create-event.component.html'
})
export class CreateEventComponent implements OnInit {

  @Input() user: User;

  @ViewChild('event_name') eventName: MdcTextField;
  @ViewChild('event_id') eventId: MdcTextField;
  @ViewChild('start_date') startDate: MdcTextField;
  @ViewChild('end_date') endDate: MdcTextField;
  @ViewChild('website') website: MdcTextField;
  @ViewChild('venue') venue: MdcTextField;
  @ViewChild('city') city: MdcTextField;
  @ViewChild('state') state: MdcTextField;
  @ViewChild('country') country: MdcTextField;
  @ViewChild('eventCache') eventCache: MdcTextField;
  @ViewChild('teamCache') teamCache: MdcTextField;
  @ViewChild('matchCache') matchCache: MdcTextField;
  @ViewChild('dual_division') dualDivision: MdcCheckbox;
  @ViewChild('division_number') divisionNumber: MdcTextField;
  @ViewChild('division_name') divisionName: MdcTextField;
  @ViewChild('advanced') advanced: MdcCheckbox;
  @ViewChild('number_fields') numberFields: MdcTextField;
  @ViewChild('number_alliances') numberAlliances: MdcTextField;
  @ViewChild('advancement_spots') advSpots: MdcTextField;
  @ViewChild('advancement_event') advEvent: MdcTextField;

  seasons: Season[];
  regions: Region[];
  eventTypes: EventType[];
  currentSeason: Season = null;
  currentRegion: Region = null;
  currentEventType: EventType = null;

  constructor(private appBarService: AppBarService, private cloud: CloudFunctions, private ftc: FTCDatabase,
              private translate: TranslateService, private snackbar: MdcSnackbar, private router: Router) {

  }

  ngOnInit() {
    this.translate.get('pages.account.manage_events').subscribe((res) => {
      this.appBarService.setTitle('myTOA - ' + res, true)
    });
    this.ftc.getAllRegions().then((data: Region[]) => {
      this.regions = data;
      this.currentRegion = this.regions[0];
    });
    this.ftc.getAllSeasons().then((data: Season[]) => {
      this.seasons = data.reverse();
      this.currentSeason = this.seasons[0];
    });
    this.ftc.getAllEventTypes().then((data: EventType[]) => {
      this.eventTypes = data;
      this.currentEventType = this.eventTypes[0];
    });
  }

  onSeasonChange(event: {index: any, value: any}) {
    this.currentSeason = this.seasons[event.index - 1];
  }

  onRegionChange(event: {index: any, value: any}) {
    this.currentRegion = this.regions[event.index - 1];
  }

  onEventTypeChange(event: {index: any, value: any}) {
    this.currentEventType = this.eventTypes[event.index - 1];
  }

  resetAdvanced() {
    this.numberAlliances.value = 4;
    this.numberFields.value = 2;
    this.advSpots.value = '';
    this.advEvent.value = '';

    this.numberAlliances.disabled = true;
    this.numberFields.disabled = true;
    this.advSpots.disabled = true;
    this.advEvent.disabled = true;

    this.numberAlliances.disabled = false;
    this.numberFields.disabled = false;
    this.advSpots.disabled = false;
    this.advEvent.disabled = false;
  }

  resetDualDivision() {
    this.divisionNumber.value = 0;
    this.divisionName.value = '';

    this.divisionNumber.disabled = true;
    this.divisionName.disabled = true;

    this.divisionNumber.disabled = false;
    this.divisionName.disabled = false;
  }

  createEvent() {
    const event = new Event;
    event.eventKey = this.currentSeason.seasonKey + '-' + this.currentRegion.regionKey + '-' + this.eventId.value;
    event.seasonKey = this.currentSeason.seasonKey;
    event.regionKey = this.currentRegion.regionKey;
    event.eventCode = this.eventId.value;
    event.eventTypeKey = this.currentEventType.eventTypeKey;
    event.eventName = this.eventName.value;
    event.divisionKey = (this.divisionNumber) ? this.divisionNumber.value : 0;
    event.divisionName = (this.divisionName) ? this.divisionName.value : undefined;
    event.fieldCount = (this.numberFields) ? this.numberFields.value : 2;
    event.allianceCount = (this.numberAlliances) ? this.numberAlliances.value : 4;
    event.advanceSpots = (this.advSpots) ? this.advSpots.value : undefined;
    event.advanceEvent = (this.advEvent) ? this.advEvent.value : undefined;
    event.activeTournamentLevel = '0';
    event.startDate = this.startDate.value;
    event.endDate = this.endDate.value;
    event.weekKey = this.dateToMonth(this.startDate.value);
    event.city = this.city.value;
    event.stateProv = this.state.value;
    event.country = this.country.value;
    event.venue = this.venue.value;
    event.isPublic = true;

    this.cloud.createEvent(this.user.firebaseUser, [event.toJSON()]).then((data) => {
      this.translate.get('pages.account.create_event_card.success').subscribe((str) => {
        this.snackbar.open(str, 'Go').afterDismiss().subscribe(reason => {
          if (reason === 'action') {
            this.router.navigateByUrl('/events/' + event.eventKey);
          }
        });
      });
    }).catch((err) => {
      this.translate.get('pages.account.create_event_card.success').subscribe((str) => {
        this.snackbar.open(`${str} (HTTP-${err.status})`);
      });
    });
  }

  dateToMonth(date: number): string {
    const month = date.toString().split('-')[1];
    switch (parseInt(month, 10)) {
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
    }
  }
}
