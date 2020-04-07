import { Injectable } from '@angular/core';
import Ranking from '../models/Ranking';

@Injectable()
export class RankingSorter {

  public sortByRank(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.rank - b.rank);
    }
  }

  public sortByTeam(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.team.teamNumber - b.team.teamNumber);
    }
  }

  public sortByOpr(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.opr - b.opr);
    }
  }

  public sortByNpOpr(rankings: Ranking[]) {
    if(rankings) {
      rankings.sort((a, b) => a.npOpr - b.npOpr);
    }
  }
}
