import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Match from '../../models/Match';

@Component({
  selector: 'match-table',
  templateUrl: './match-table.component.html'
})
export class MatchTableComponent {
  @Input() match: Match;
}
