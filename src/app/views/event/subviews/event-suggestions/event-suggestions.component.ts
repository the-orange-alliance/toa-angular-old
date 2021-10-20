import {Component, OnInit, AfterViewInit, Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import { FTCDatabase } from '../../../../providers/ftc-database';
import { CloudFunctions } from '../../../../providers/cloud-functions';
import { UploadService } from '../../../../providers/imgur';
import { AngularFireDatabase } from '@angular/fire/database';
import {MdcSelect, MdcSelectChange, MdcSnackbar, MdcTextField} from '@angular-mdc/web';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import Event from '../../../../models/Event';
import Match from 'app/models/Match';

@Component({
  providers: [CloudFunctions, UploadService],
  selector: 'toa-event-suggestions',
  templateUrl: './event-suggestions.component.html',
  styleUrls: ['./event-suggestions.component.scss']
})
export class EventSuggestionsComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  @Input() matches: Match[];
  @Input() eventKey: string;
  @Input() event: Event;

  @ViewChild('suggestion_type', {static: false}) suggestionType: MdcSelect;
  @ViewChild('notes', {static: false}) notes: MdcTextField;
  @ViewChild('url', {static: false}) url: MdcTextField;
  @ViewChild('description', {static: false}) description: MdcTextField;
  @ViewChild('match_selector', {static: false}) matchSelector: MdcSelect;

  public image: { filename: string, raw: string, url: any };

  public hideUrl = true
  public hideDesc = true
  public hideFilebox = true
  public hideMatchSelect = true
  public hideNotes = true
  public hideSubmit = true

  public currentMedia: string = null

  constructor(private cloud: CloudFunctions, private db: AngularFireDatabase, private snackbar: MdcSnackbar,
              private translate: TranslateService, private router: Router, public imgur: UploadService,
              private ftc: FTCDatabase, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  setFieldText(elm: MdcTextField, text: string) {
    elm.setValue(text);
  }

  getFieldText(elm: MdcTextField) {
    return elm.value;
  }

  showSnackbar(translateKey: string, errorKey?: string, value?: any) {
    const isEmail = (errorKey) ? errorKey.indexOf('428') > -1 : undefined;
    const msg = (isEmail) ? 'pages.event.subpages.admin.verify_email' : translateKey;

    this.translate.get(msg, {value: value}).subscribe((res: string) => {

      const message = (errorKey && !isEmail) ? `${res} (${errorKey})` : res;

      const snackBarRef = this.snackbar.open(message, (isEmail) ? 'Verify' : null);

      snackBarRef.afterDismiss().subscribe(reason => {
        if (reason === 'action') {
          this.user.sendEmailVerification().then(() => {
            this.showSnackbar(`pages.event.subpages.admin.success_sent_verify_email`);
          }).catch((err) => {
            this.showSnackbar(`general.error_occurred`, `HTTP-${err.status}`);
          })
        }
      });
    });
  }

  onMediaTypeChange(e: MdcSelectChange) {
    switch (e.value) {
      case 'twitch_stream':
      case 'twitch_vod':
      case 'youtube_stream':
      case 'youtube_playlist':
        this.hideDesc = true;
        this.hideFilebox = true;
        this.hideUrl = false;
        this.hideMatchSelect = true;
        this.hideNotes = false;
        this.hideSubmit = false;
        break;
      case 'twitch_clip':
      case 'youtube_video':
        this.hideDesc = true;
        this.hideFilebox = true;
        this.hideUrl = false;
        this.hideMatchSelect = false;
        this.hideNotes = false;
        this.hideSubmit = false;
        break;
      case 'venue_media':
      case 'other':
        this.hideDesc = false;
        this.hideFilebox = false;
        this.hideUrl = false;
        this.hideMatchSelect = true;
        this.hideNotes = false;
        this.hideSubmit = false;
        break;
    }
    this.currentMedia = e.value;
  }

  handleImage(e) {
    console.log(e.target)
    const image = e.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.image = {
          filename: image.name,
          raw: reader.result.toString(),
          url: image,
        };
      };
      reader.readAsDataURL(image);
    }
  }

  async submitSuggestion()  {
    const requiresUrl = this.currentMedia && (this.currentMedia !== 'venue_media' && this.currentMedia !== 'other')
    const requiresMatch = this.currentMedia && (this.currentMedia === 'twitch_clip' || this.currentMedia === 'youtube_video')
    const requiresSomething = this.currentMedia && (this.currentMedia === 'venue_media' || this.currentMedia === 'other')
    const notes = this.notes ? this.getFieldText(this.notes) : ''
    const url = this.url ? this.getFieldText(this.url) : ''
    const desc = this.description ? this.getFieldText(this.description) : ''
    const matchKey = this.matchSelector && this.matchSelector.value ? this.matchSelector.value : ''
    const notesEmpty = !notes || (notes && notes.length < 1)
    const urlEmpty = !url || (url && url.length < 1)
    const descEmpty = !desc || (desc && desc.length < 1)
    const matchEmpty = !matchKey || (matchKey && matchKey.length < 1)

    // Check for Notes
    if (!notes || notesEmpty) {
      this.showSnackbar('pages.event.subpages.suggestions.missing_field', undefined, 'Notes');
      return;
    }
    // Check for URL
    if (requiresUrl && urlEmpty) {
      this.showSnackbar('pages.event.subpages.suggestions.missing_field', undefined, 'URL');
      return;
    }
    // Check for valid URL
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (requiresUrl && !urlEmpty && urlRegex.exec(url) === null) {
      this.showSnackbar('pages.event.subpages.suggestions.missing_field', undefined, 'Valid URL');
      return;
    }
    // Check for Match stuffs
    if (requiresMatch && matchEmpty) {
      this.showSnackbar('pages.event.subpages.suggestions.missing_field', undefined, 'Match');
      return;
    }
    // Check for other and venue that we have something
    if (requiresSomething && urlEmpty && descEmpty && !this.image) {
      this.showSnackbar('pages.event.subpages.suggestions.missing_field', undefined, 'a field. Please fill at least one field');
      return;
    }

    const mediaData = {
      event_key: this.event.eventKey,
      data_type: this.currentMedia,
      description: desc,
      url: url,
      notes: notes,
      match: matchKey,
      img_url: null
    }

    if (this.image) {
      let img = this.image.raw
      const split = this.image.raw.split(',')
      if (split.length > 1) {
        img = split[1]
      }
      await this.imgur.uploadImage(img).then((data: any) => {
        mediaData.img_url = data.data.link
      }, (err) => {
        this.showSnackbar('general.error_occurred', `HTTP-${err.status}`);
      });
    }

    this.cloud.addSuggestion(this.user, mediaData).then(() => {
      this.showSnackbar('pages.event.subpages.suggestions.success_msg');
    })
  }

  mapParticipants(match: Match) {
    return match.participants.map(p => p.teamKey).join(', ')
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
